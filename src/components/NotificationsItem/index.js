import React from "react";
import { ListGroup } from "react-bootstrap";

function NotificationsItem({ notification, notificationTimestamp }) {
  return (
    <ListGroup.Item action className="notifications-popover-item">
      <img
        src={notification.profileImage}
        alt="user_icon"
        className="notifications-popover-img"
      />
      <p>
        <strong>{notification.username}</strong> followed you{" "}
        {notificationTimestamp}
      </p>
    </ListGroup.Item>
  );
}

export default NotificationsItem;
