import React from "react";
import { Modal, ListGroup } from "react-bootstrap";

const ProfileHeaderImageModal = ({
  showProfileImage,
  hideProfileImageOptions,
}) => {
  return (
    <Modal show={showProfileImage} onHide={hideProfileImageOptions}>
      <Modal.Header closeButton>
        <Modal.Title className="profile-header-modal-title">
          <h5>Change Profile Photo</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <ListGroup variant="flush" className="text-center">
          <ListGroup.Item action className="text-primary">
            <strong>Upload Photo</strong>
          </ListGroup.Item>
          <ListGroup.Item action className="text-danger">
            <strong>Remove Current Photo</strong>
          </ListGroup.Item>
          <ListGroup.Item action onClick={hideProfileImageOptions}>
            Cancel
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileHeaderImageModal;
