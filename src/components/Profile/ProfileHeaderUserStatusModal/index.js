import React from "react";
import { Modal, ListGroup } from "react-bootstrap";
import { useAuth } from "../../../utils/authProvider";
import { unfollowUser } from "../../../utils/userActions";

function ProfileHeaderUserStatusModal({ showModal, hideModal, clickedUser }) {
  const { authUser } = useAuth();

  return (
    <Modal show={showModal} onHide={hideModal} centered>
      <Modal.Header className="profile-header-user-status-header">
        <img
          src={clickedUser?.profileImage}
          alt="modal"
          className="profile-header-user-status-img"
        />
        <p>
          If you change your mind, you'll have to request to follow @
          {clickedUser?.username} again.
        </p>
      </Modal.Header>
      <Modal.Body className="profile-header-user-status-body">
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            className="text-danger"
            onClick={() => {
              unfollowUser(authUser, clickedUser.id);
              hideModal();
            }}
          >
            <strong>Unfollow</strong>
          </ListGroup.Item>
          <ListGroup.Item action onClick={hideModal}>
            Cancel
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileHeaderUserStatusModal;
