import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BsFillTrashFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { projectFirestore } from "../../firebase/config";
import { useAuth } from "../../utils/authProvider";
import formatTimestamp from "../../utils/formatTimestamp";
import CommentLikesModal from "../CommentLikesModal";
import {
  likeComment,
  dislikeComment,
  deleteComment,
} from "../../utils/userActions";

const Comment = ({ comment, post }) => {
  const [liked, setLiked] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const history = useHistory();
  const { authUser } = useAuth();
  const authUserId = authUser && authUser.uid;

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .doc(comment.postId)
      .collection("comments")
      .doc(comment.id)
      .onSnapshot((snapshot) => {
        setLiked(snapshot.data().likes.includes(authUserId));
      });

    return () => unsub();
  }, [comment, authUserId]);

  const goToUserProfile = () => {
    history.push(`/profile/${comment.creatorId}`);
  };

  const openLikesModal = () => setShowLikesModal(true);
  const closeLikesModal = () => setShowLikesModal(false);

  return (
    <div>
      <div className="comment">
        <p className="comment__text">
          <strong onClick={goToUserProfile} style={{ cursor: "pointer" }}>
            {comment.creatorUsername}
          </strong>{" "}
          {comment.text}
        </p>
        {authUserId === comment.creatorId ? (
          <BsFillTrashFill
            className="comment__icon"
            onClick={() => deleteComment(post.id, comment.id)}
            style={{ color: "red" }}
          />
        ) : liked ? (
          <BsHeartFill
            className="comment__icon"
            onClick={() => dislikeComment(authUser, comment)}
            style={{ color: "red" }}
          />
        ) : (
          <BsHeart
            className="comment__icon"
            onClick={() => likeComment(authUser, comment, post.imageUrl)}
          />
        )}
      </div>
      <div className="comment__details">
        <p className="comment__details-text">
          {formatTimestamp(comment.timestamp)}
        </p>
        {comment.likes.length > 0 && (
          <p className="comment__details-text" onClick={openLikesModal}>
            {comment.likes.length}{" "}
            {comment.likes.length === 1 ? "like" : "likes"}
          </p>
        )}
        <p className="comment__details-text">Reply</p>
      </div>
      <CommentLikesModal
        showModal={showLikesModal}
        hideModal={closeLikesModal}
        likes={comment.likes}
      />
    </div>
  );
};

export default Comment;
