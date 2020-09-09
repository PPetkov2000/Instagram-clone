import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import PostNavbar from "../PostNavbar";
import Comments from "../Comments";
import AddComment from "../AddComment";
import { GlobalStateContext } from "../../utils/context";
import { projectFirestore } from "../../firebase/config";
import requester from "../../firebase/requester";
import formatTimestamp from "../../utils/formatTimestamp";

const PostCommentsDetails = (props) => {
  const postId = props.match.params.id;
  const [imageUrl, setImageUrl] = useState("");
  const [likes, setLikes] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [username, setUsername] = useState("");
  const [creator, setCreator] = useState(null);
  const [postCreatorProfileImage, setPostCreatorProfileImage] = useState();
  const [postUploadTime, setPostUploadTime] = useState("");
  const context = useContext(GlobalStateContext);
  const uid = context && context.uid;

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .doc(postId)
      .onSnapshot((snapshot) => {
        setLikes(snapshot.data().likes);
        setImageUrl(snapshot.data().imageUrl);
        setUsername(snapshot.data().username);
        setCreator(snapshot.data().creator);
      });

    return () => unsub();
  }, [postId]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        const following = snapshot.data().following;

        if (following.includes(creator)) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });

    return () => unsub();
  }, [uid, creator]);

  useEffect(() => {
    if (creator == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(creator)
      .onSnapshot((snapshot) => {
        setPostCreatorProfileImage(snapshot.data().profileImage);
      });

    return () => unsub();
  }, [creator]);

  useEffect(() => {
    requester
      .get("posts", postId)
      .then((res) => {
        setPostUploadTime(formatTimestamp(res.data().timestamp));
      })
      .catch(console.error);
  }, [postId]);

  const followAndUnfollowUser = () => {
    Promise.all([
      requester.get("instagramUsers", uid),
      requester.get("instagramUsers", creator),
    ]).then(([currentUser, postCreatorUser]) => {
      let currentUserFollowing = currentUser.data().following;
      let postCreatorUserFollowers = postCreatorUser.data().followers;
      let postCreatorUserNotifications = postCreatorUser.data().notifications;

      if (!currentUserFollowing.includes(creator)) {
        currentUserFollowing.push(creator);
        postCreatorUserFollowers.push(uid);
        postCreatorUserNotifications.push({
          id: currentUser.id,
          username: currentUser.data().username,
          profileImage: currentUser.data().profileImage,
          timestamp: new Date(),
          type: "follower",
        });
      } else {
        currentUserFollowing = currentUserFollowing.filter(
          (x) => x !== creator
        );
        postCreatorUserFollowers = postCreatorUserFollowers.filter(
          (x) => x !== uid
        );
        postCreatorUserNotifications = postCreatorUserNotifications.filter(
          (x) => x.id !== uid
        );
      }

      return Promise.all([
        requester.update("instagramUsers", uid, {
          following: currentUserFollowing,
        }),
        requester.update("instagramUsers", creator, {
          followers: postCreatorUserFollowers,
          notifications: postCreatorUserNotifications,
        }),
      ]);
    });
  };

  // There is a bug when the page refreshes

  return (
    <div className="details-container">
      <img src={imageUrl} alt="post" className="post-image" />
      <aside className="comments-section">
        <Card>
          <Card.Header className="post-details-header">
            <Link to={`/profile/${creator}`}>
              <Card.Img
                variant="top"
                src={postCreatorProfileImage}
                className="card-header-img"
              />
            </Link>
            <strong>{username} • </strong>
            {uid !== creator && (
              <>
                {isFollowing ? (
                  <Card.Link href="#unfollow" onClick={followAndUnfollowUser}>
                    Unfollow
                  </Card.Link>
                ) : (
                  <Card.Link href="#follow" onClick={followAndUnfollowUser}>
                    Follow
                  </Card.Link>
                )}
              </>
            )}
          </Card.Header>
          <Card.Body>
            <Comments postId={postId} showAddComment={false} />
          </Card.Body>
          <Card.Footer className="post-details-footer">
            <PostNavbar postId={postId} />
            {likes.length === 0 ? (
              <strong>No likes</strong>
            ) : likes.length === 1 ? (
              <strong>{likes.length} like</strong>
            ) : (
              <strong>{likes.length} likes</strong>
            )}
            <p className="text-muted">{postUploadTime}</p>
            <AddComment
              postId={postId}
              username={context && context.username}
            />
          </Card.Footer>
        </Card>
      </aside>
    </div>
  );
};

export default PostCommentsDetails;
