import React from "react";
import { ListGroup } from "react-bootstrap";

function NotificationsItem({ notification }) {
  return (
    <ListGroup.Item action className="popover-item">
      <img
        src={notification.userImageUrl}
        alt="user_icon"
        className="popover-img"
      />
      <p>
        <strong>{notification.user}</strong> tagged you in a comment
      </p>
    </ListGroup.Item>
  );
}

export default NotificationsItem;
