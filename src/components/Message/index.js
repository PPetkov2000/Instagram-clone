import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const Message = ({ message, showCurrentMessage }) => {
  return (
    <ListGroup.Item
      action
      className="messages-item"
      onClick={showCurrentMessage}
    >
      <Card.Link href="#profile">
        <Card.Img
          variant="top"
          src="/images/user_icon.png"
          className="messages-body-img"
        />
      </Card.Link>
      <div>
        <span>{message.user}</span>
        <p className="messages-p text-muted">{message.text} * 2 min</p>
      </div>
    </ListGroup.Item>
  );
};

export default Message;
