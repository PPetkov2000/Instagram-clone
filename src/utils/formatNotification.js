export default function (notification) {
  const type = notification.type;

  const notificationTypes = {
    follower: (username) => `${username} followed you`,
    like: (username) => `${username} liked your post`,
    comment: (username) => `${username} commented on your post`,
    "like-comment": (username) => `${username} liked your comment`,
  };

  if (typeof notificationTypes[type] === "function") {
    return notificationTypes[type](notification.username);
  }
}
