import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import PostNavbar from "../PostNavbar";
import Comments from "../Comments";
import AddComment from "../AddComment";
import { GlobalStateContext } from "../../context";
import { projectFirestore } from "../../firebase/config";

const PostCommentsDetails = (props) => {
  const postId = props.match.params.id;
  const [imageUrl, setImageUrl] = useState("");
  const [likes, setLikes] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [username, setUsername] = useState("");
  const [creator, setCreator] = useState("");
  const context = useContext(GlobalStateContext);
  const uid = context && context.uid;
  const profileImage = context && context.profileImage;

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .doc(postId)
      .onSnapshot((res) => {
        setLikes(res.data().likes);
        setImageUrl(res.data().imageUrl);
        setUsername(res.data().username);
        setCreator(res.data().creator);
      });

    return () => unsub();
  }, [postId]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        const following = snapshot.data().following;
        const followers = snapshot.data().followers;

        if (following.includes(creator)) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });

    return () => unsub();
  }, [uid, creator]);

  const followAndUnfollowUser = () => {
    projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .get()
      .then((res) => {
        let following = res.data().following;
        let followers = res.data().followers;

        if (!following.includes(creator)) {
          following.push(creator);
        } else {
          following = following.filter((x) => x !== creator);
        }

        return projectFirestore
          .collection("instagramUsers")
          .doc(uid)
          .update({ following });
      });
  };

  return (
    <div className="details-container">
      <img src={imageUrl} alt="post" className="post-image" />
      <aside className="comments-section">
        <Card>
          <Card.Header className="post-details-header">
            <Link to="/profile">
              <Card.Img
                variant="top"
                src={profileImage}
                className="card-header-img"
              />
            </Link>
            <strong>{username}:</strong>{" "}
            {isFollowing ? (
              <Card.Link href="#unfollow" onClick={followAndUnfollowUser}>
                Unfollow
              </Card.Link>
            ) : (
              <Card.Link href="#follow" onClick={followAndUnfollowUser}>
                Follow
              </Card.Link>
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
            <p className="text-muted">2 hours ago</p>
            <AddComment postId={postId} username={username} />
          </Card.Footer>
        </Card>
      </aside>
    </div>
  );
};

export default PostCommentsDetails;
