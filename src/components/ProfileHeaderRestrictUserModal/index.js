import React from "react";
import { Modal, ListGroup } from "react-bootstrap";

function ProfileHeaderRestrictUserModal({ showModal, hideModal }) {
  return (
    <Modal show={showModal} onHide={hideModal} centered>
      <Modal.Body className="profile-header-restrict-user-body">
        <ListGroup variant="flush">
          <ListGroup.Item action className="text-danger">
            <strong>Block this user</strong>
          </ListGroup.Item>
          <ListGroup.Item action className="text-danger">
            <strong>Restrict</strong>
          </ListGroup.Item>
          <ListGroup.Item action className="text-danger">
            <strong>Report User</strong>
          </ListGroup.Item>
          <ListGroup.Item action onClick={hideModal}>
            Cancel
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileHeaderRestrictUserModal;
