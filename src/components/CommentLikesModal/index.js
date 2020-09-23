import React from "react";
import { Modal } from "react-bootstrap";
import { useGlobalContext } from "../../utils/context";

function CommentLikesModal({
  showModal,
  hideModal,
  likedCommentUsers,
  currentUserFollowing,
}) {
  const context = useGlobalContext();
  const uid = context && context.uid;

  return (
    <Modal show={showModal} onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Likes</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        {likedCommentUsers.map((user) => {
          return (
            <div key={user.id} className="comment-likes-modal-body-container">
              <img
                src={user.profileImage}
                alt="user"
                className="comment-likes-img"
              />
              <div className="comment-likes-modal-body-text">
                <strong>{user.username}</strong>
                <p className="text-muted">{user.fullName}</p>
              </div>
              {uid !== user.id && (
                <>
                  {currentUserFollowing.includes(user.id) ? (
                    <button className="comment-likes-button">Following</button>
                  ) : (
                    <button className="comment-likes-button">Follow</button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </Modal.Body>
    </Modal>
  );
}

export default CommentLikesModal;
