import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { projectFirestore } from "../../firebase/config";
import { useGlobalContext } from "../../utils/context";
import requester from "../../firebase/requester";
import formatTimestamp from "../../utils/formatTimestamp";
import CommentLikesModal from "../CommentLikesModal";

const Comment = ({ comment, post }) => {
  const [liked, setLiked] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const history = useHistory();
  const context = useGlobalContext();
  const uid = context && context.uid;

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .doc(comment.postId)
      .collection("comments")
      .doc(comment.id)
      .onSnapshot((snapshot) => {
        setLiked(snapshot.data().likes.includes(uid));
      });

    return () => unsub();
  }, [comment.postId, comment.id, uid]);

  const goToUserProfile = () => {
    history.push(`/profile/${comment.creatorId}`);
  };

  const openLikesModal = () => setShowLikesModal(true);
  const closeLikesModal = () => setShowLikesModal(false);

  const likeAndDislikeComment = () => {
    Promise.all([
      projectFirestore
        .collection("posts")
        .doc(comment.postId)
        .collection("comments")
        .doc(comment.id)
        .get(),
      requester.get("instagramUsers", comment.creatorId),
    ])
      .then(([currentComment, commentCreator]) => {
        let currentCommentLikes = currentComment.data().likes;
        let commentCreatorNotifications = commentCreator.data().notifications;

        if (!currentCommentLikes.includes(uid)) {
          currentCommentLikes.push(uid);
          commentCreatorNotifications.push({
            id: uid,
            username: context && context.username,
            profileImage: context && context.profileImage,
            timestamp: new Date(),
            type: "like-comment",
            postId: comment.postId,
            postImageUrl: post.imageUrl,
          });
        } else {
          currentCommentLikes = currentCommentLikes.filter((x) => x !== uid);
          commentCreatorNotifications = commentCreatorNotifications.filter(
            (x) => x.id !== uid
          );
        }

        return Promise.all([
          projectFirestore
            .collection("posts")
            .doc(comment.postId)
            .collection("comments")
            .doc(comment.id)
            .update({ likes: currentCommentLikes }),
          requester.update("instagramUsers", comment.creatorId, {
            notifications: commentCreatorNotifications,
          }),
        ]);
      })
      .catch(console.error);
  };

  return (
    <div>
      <div className="comment">
        <p className="comment__text">
          <strong onClick={goToUserProfile} style={{ cursor: "pointer" }}>
            {comment.creatorUsername}
          </strong>{" "}
          {comment.text}
        </p>
        {liked ? (
          <FcLike className="comment__icon" onClick={likeAndDislikeComment} />
        ) : (
          <BsHeart className="comment__icon" onClick={likeAndDislikeComment} />
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
