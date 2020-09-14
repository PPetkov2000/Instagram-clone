import React from "react";
import { useHistory } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import formatNotification from "../../utils/formatNotification";
import formatTimestamp from "../../utils/formatTimestamp";

function NotificationsItem({ notification }) {
  const notificationText = formatNotification(notification);
  const history = useHistory();

  const goToUserProfile = () => {
    history.push(`/profile/${notification.id}`);
  };

  const openNotificationPost = () => {
    history.push(`/post-comments-details/${notification.post.id}`);
  };

  return (
    <ListGroup.Item action className="notifications-popover-item">
      <img
        src={notification.profileImage}
        alt="user_icon"
        className="notifications-popover-img"
        onClick={goToUserProfile}
      />
      <p>
        <strong onClick={goToUserProfile}>
          {notificationText.slice(0, notificationText.indexOf(" "))}
        </strong>{" "}
        {notificationText.slice(notificationText.indexOf(" "))}{" "}
        {formatTimestamp(notification.timestamp)}
      </p>
      {notification.post && (
        <img
          src={notification.post.imageUrl}
          alt="notification"
          className="notification-popover-post-img"
          onClick={openNotificationPost}
        />
      )}
    </ListGroup.Item>
  );
}

export default NotificationsItem;
