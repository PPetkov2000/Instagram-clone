import React from "react";
import { Modal, ListGroup } from "react-bootstrap";

const PostModal = ({ showModal, hideOptions }) => {
  return (
    <Modal show={showModal} onHide={hideOptions}>
      <Modal.Body className="modal-body">
        <ListGroup variant="flush" className="text-center">
          <ListGroup.Item action className="text-danger">
            Report
          </ListGroup.Item>
          <ListGroup.Item action className="text-danger">
            Cancel subscription
          </ListGroup.Item>
          <ListGroup.Item action>To publication</ListGroup.Item>
          <ListGroup.Item action>Share</ListGroup.Item>
          <ListGroup.Item action>Copy</ListGroup.Item>
          <ListGroup.Item action>Embed</ListGroup.Item>
          <ListGroup.Item action onClick={hideOptions}>
            Cancel
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
