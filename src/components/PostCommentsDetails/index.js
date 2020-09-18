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
  let postId;
  if (!props.match) {
    postId = props.postId;
  } else {
    postId = props.match.params.id;
  }
  // const postId = props.match.params.id;
  const [post, setPost] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
  const [postCreatorProfileImage, setPostCreatorProfileImage] = useState();
  const context = useContext(GlobalStateContext);
  const uid = context && context.uid;
  const postCreator = post && post.creator;

  useEffect(() => {
    if (postId == null) return;

    const unsub = projectFirestore
      .collection("posts")
      .doc(postId)
      .onSnapshot((snapshot) => {
        setPost({ id: snapshot.id, ...snapshot.data() });
      });

    return () => unsub();
  }, [postId]);

  useEffect(() => {
    if (uid == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setIsFollowing(snapshot.data().following.includes(postCreator));
      });

    return () => unsub();
  }, [uid, postCreator]);

  useEffect(() => {
    if (postCreator == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(postCreator)
      .onSnapshot((snapshot) => {
        setPostCreatorProfileImage(snapshot.data().profileImage);
      });

    return () => unsub();
  }, [postCreator]);

  const followAndUnfollowUser = () => {
    Promise.all([
      requester.get("instagramUsers", uid),
      requester.get("instagramUsers", postCreator),
    ]).then(([currentUser, postCreatorUser]) => {
      let currentUserFollowing = currentUser.data().following;
      let postCreatorUserFollowers = postCreatorUser.data().followers;
      let postCreatorUserNotifications = postCreatorUser.data().notifications;

      if (!currentUserFollowing.includes(postCreator)) {
        currentUserFollowing.push(postCreator);
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
          (x) => x !== postCreator
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
        requester.update("instagramUsers", postCreator, {
          followers: postCreatorUserFollowers,
          notifications: postCreatorUserNotifications,
        }),
      ]);
    });
  };

  // There is a bug when the page refreshes

  return post ? (
    <div className="details-container">
      <img src={post.imageUrl} alt="post" className="post-image" />
      <aside className="comments-section">
        <Card>
          <Card.Header className="post-details-header">
            <Link to={`/profile/${postCreator}`}>
              <Card.Img
                variant="top"
                src={postCreatorProfileImage}
                className="card-header-img"
              />
            </Link>
            <strong>{post.username} • </strong>
            {uid !== postCreator && (
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
            <Comments showAddComment={false} post={post} />
          </Card.Body>
          <Card.Footer className="post-details-footer">
            <PostNavbar post={post} />
            {post.likes.length === 0 ? (
              <strong>No likes</strong>
            ) : post.likes.length === 1 ? (
              <strong>{post.likes.length} like</strong>
            ) : (
              <strong>{post.likes.length} likes</strong>
            )}
            <p className="text-muted">{formatTimestamp(post.timestamp)}</p>
            <AddComment post={post} />
          </Card.Footer>
        </Card>
      </aside>
    </div>
  ) : (
    <center>Loading...</center>
  );
};

export default PostCommentsDetails;
