import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import PostNavbar from "../../components/PostNavbar";
import Comments from "../../components/Comments";
import AddComment from "../../components/AddComment";
import CommentLikesModal from "../../components/CommentLikesModal";
import { projectFirestore } from "../../firebase/config";
import { useAuth } from "../../contexts/authProvider";
import { followUser, unfollowUser } from "../../utils/userActions";
import formatTimestamp from "../../utils/formatTimestamp";

const PostCommentsDetails = (props) => {
  let postId;
  if (!props.match) {
    postId = props.postId;
  } else {
    postId = props.match.params.id;
  }
  const [post, setPost] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showCommentLikesModal, setShowCommentLikesModal] = useState(false);
  const [postCreatorProfileImage, setPostCreatorProfileImage] = useState();
  const { authUser } = useAuth();
  const authUserId = authUser && authUser.uid;
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
    if (authUserId == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(authUserId)
      .onSnapshot((snapshot) => {
        setIsFollowing(snapshot.data().following.includes(postCreator));
      });

    return () => unsub();
  }, [authUserId, postCreator]);

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

  const showCommentLikes = () => setShowCommentLikesModal(true);
  const hideCommentLikes = () => setShowCommentLikesModal(false);

  return post ? (
    <div className="post-details">
      <img src={post.imageUrl} alt="post" className="post-details__image" />
      <aside className="post-details__comments">
        <Card>
          <Card.Header className="post-details__header">
            <Link to={`/profile/${postCreator}`}>
              <Card.Img
                variant="top"
                src={postCreatorProfileImage}
                className="post-details__header-image"
              />
            </Link>
            <strong>{post.username} • </strong>
            {authUserId !== postCreator && (
              <>
                {isFollowing ? (
                  <Card.Link
                    href="#unfollow"
                    onClick={() => unfollowUser(authUser, postCreator)}
                  >
                    Unfollow
                  </Card.Link>
                ) : (
                  <Card.Link
                    href="#follow"
                    onClick={() => followUser(authUser, postCreator)}
                  >
                    Follow
                  </Card.Link>
                )}
              </>
            )}
          </Card.Header>
          <Card.Body>
            <Comments
              showAddComment={false}
              post={post}
              showAllComments={true}
            />
          </Card.Body>
          <Card.Footer className="post-details__footer">
            <PostNavbar post={post} />
            <button
              className="post-details__likes-button"
              onClick={showCommentLikes}
            >
              {post.likes.length === 0
                ? "No likes"
                : post.likes.length === 1
                  ? "1 like"
                  : post.likes.length + " likes"}
            </button>
            <p className="post-details__footer-text text-muted">
              {formatTimestamp(post.timestamp)}
            </p>
            <AddComment post={post} />
          </Card.Footer>
        </Card>
      </aside>

      <CommentLikesModal
        showModal={showCommentLikesModal}
        hideModal={hideCommentLikes}
        likes={post.likes}
      />
    </div>
  ) : (
    <center>Loading...</center>
  );
};

export default PostCommentsDetails;
