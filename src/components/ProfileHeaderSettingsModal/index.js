import React from "react";
import { Modal, ListGroup } from "react-bootstrap";

const ProfileHeaderSettingsModal = ({
  showProfileSettings,
  hideProfileSettingsOptions,
}) => {
  return (
    <Modal show={showProfileSettings} onHide={hideProfileSettingsOptions}>
      <Modal.Body className="modal-body">
        <ListGroup variant="flush" className="text-center">
          <ListGroup.Item action>Change Password</ListGroup.Item>
          <ListGroup.Item action>Nametag</ListGroup.Item>
          <ListGroup.Item action>Apps and Websites</ListGroup.Item>
          <ListGroup.Item action>Notifications</ListGroup.Item>
          <ListGroup.Item action>Privacy and Security</ListGroup.Item>
          <ListGroup.Item action>Login Activity</ListGroup.Item>
          <ListGroup.Item action>Emails from Instagram</ListGroup.Item>
          <ListGroup.Item action>Report a Problem</ListGroup.Item>
          <ListGroup.Item action>Log Out</ListGroup.Item>
          <ListGroup.Item action onClick={hideProfileSettingsOptions}>
            Cancel
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileHeaderSettingsModal;
