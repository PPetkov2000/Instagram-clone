import React from "react";
import { Modal } from "react-bootstrap";
import PostCommentsDetails from "../../../screens/PostCommentsDetails";

const ProfilePostsContentModal = ({ showModal, hideModalHandler, postId }) => {
  return (
    <Modal
      show={showModal}
      onHide={hideModalHandler}
      centered
      className="profile-posts-modal"
    >
      <Modal.Body className="profile-posts-modal-body">
        <PostCommentsDetails postId={postId} />
      </Modal.Body>
    </Modal>
  );
};

export default ProfilePostsContentModal;
