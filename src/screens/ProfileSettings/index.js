import React from "react";
import { ListGroup, Tab, Row, Col } from "react-bootstrap";
import ProfileEdit from "../../components/Profile/ProfileEdit";
import ProfileChangePassword from "../../components/Profile/ProfileChangePassword";

function ProfileSettings() {
  return (
    <Tab.Container defaultActiveKey="#edit-profile">
      <Row className="edit-profile__row">
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href="#edit-profile">
              Edit Profile
            </ListGroup.Item>
            <ListGroup.Item action href="#change-password">
              Change Password
            </ListGroup.Item>
            <ListGroup.Item action href="#apps-and-websites">
              Apps and Websites
            </ListGroup.Item>
            <ListGroup.Item action href="#email-and-sms">
              Email and SMS
            </ListGroup.Item>
            <ListGroup.Item action href="#push-notifications">
              Push Notifications
            </ListGroup.Item>
            <ListGroup.Item action href="#manage-contacts">
              Manage Contacts
            </ListGroup.Item>
            <ListGroup.Item action href="#privacy-and-security">
              Privacy and Security
            </ListGroup.Item>
            <ListGroup.Item action href="#login-activity">
              Login Activity
            </ListGroup.Item>
            <ListGroup.Item action href="#emails-from-instagram">
              Emails from Instagram
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8} style={{ border: "1px solid lightgray" }}>
          <Tab.Content>
            <Tab.Pane eventKey="#edit-profile">
              <ProfileEdit />
            </Tab.Pane>
            <Tab.Pane eventKey="#change-password">
              <ProfileChangePassword />
            </Tab.Pane>
            <Tab.Pane eventKey="#apps-and-websites">Apps and Websites</Tab.Pane>
            <Tab.Pane eventKey="#email-and-sms">Email and SMS</Tab.Pane>
            <Tab.Pane eventKey="#push-notifications">
              Push Notifications
            </Tab.Pane>
            <Tab.Pane eventKey="#manage-contacts">Manage Contacts</Tab.Pane>
            <Tab.Pane eventKey="#privacy-and-security">
              Privacy and Security
            </Tab.Pane>
            <Tab.Pane eventKey="#login-activity">Login Activity</Tab.Pane>
            <Tab.Pane eventKey="#emails-from-instagram">
              Emails from Instagram
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default ProfileSettings;
