import React from "react";
import { Card } from "react-bootstrap";

const UserMessages = () => {
  return (
    <div className="user-messages-container">
      <Card>
        <Card.Header className="user-messages-header">
          <Card.Img
            variant="top"
            src="/images/user_icon.png"
            className="user-messages-img"
            style={{ cursor: "pointer" }}
          />
          <strong>random_user</strong>
        </Card.Header>
        <Card.Body className="user-messages-body">
          Messages goes here...
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserMessages;
