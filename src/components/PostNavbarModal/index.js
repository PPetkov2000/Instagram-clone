import React from "react";
import { Modal, ListGroup } from "react-bootstrap";

const PostNavbarModal = ({ showModal, hideOptions }) => {
  return (
    <Modal show={showModal} onHide={hideOptions} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Share</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <ListGroup variant="flush">
          <ListGroup.Item action>Share in Direct</ListGroup.Item>
          <ListGroup.Item action>Share in Facebook</ListGroup.Item>
          <ListGroup.Item action>Share in Messenger</ListGroup.Item>
          <ListGroup.Item action>Share in Twitter</ListGroup.Item>
          <ListGroup.Item action>Share with Email</ListGroup.Item>
          <ListGroup.Item action>Copy</ListGroup.Item>
          <ListGroup.Item action onClick={hideOptions}>
            Cancel
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default PostNavbarModal;
