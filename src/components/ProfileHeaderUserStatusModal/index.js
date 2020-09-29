import React from "react";
import { Modal, ListGroup } from "react-bootstrap";
import requester from "../../firebase/requester";

function ProfileHeaderUserStatusModal({
  showModal,
  hideModal,
  userId,
  uid,
  userProfileImage,
  username,
}) {
  const unfollowUser = () => {
    Promise.all([
      requester.get("instagramUsers", uid),
      requester.get("instagramUsers", userId),
    ])
      .then(([currentUser, unfollowedUser]) => {
        let currentUserFollowing = currentUser.data().following;
        let unfollowedUserFollowers = unfollowedUser.data().followers;
        let unfollowedUserNotifications = unfollowedUser.data().notifications;

        currentUserFollowing = currentUserFollowing.filter((x) => x !== userId);
        unfollowedUserFollowers = currentUserFollowing.filter((x) => x !== uid);
        unfollowedUserNotifications = unfollowedUserNotifications.filter(
          (x) => x.id !== uid
        );

        return Promise.all([
          requester.update("instagramUsers", uid, {
            following: currentUserFollowing,
          }),
          requester.update("instagramUsers", userId, {
            followers: unfollowedUserFollowers,
            notifications: unfollowedUserNotifications,
          }),
        ]);
      })
      .catch(console.error);

    hideModal();
  };

  return (
    <Modal show={showModal} onHide={hideModal} centered>
      <Modal.Header className="profile-header-user-status-header">
        <img
          src={userProfileImage}
          alt="modal"
          className="profile-header-user-status-img"
        />
        <p>
          If you change your mind, you'll have to request to follow @{username}{" "}
          again.
        </p>
      </Modal.Header>
      <Modal.Body className="profile-header-user-status-body">
        <ListGroup variant="flush">
          <ListGroup.Item action className="text-danger" onClick={unfollowUser}>
            <strong>Unfollow</strong>
          </ListGroup.Item>
          <ListGroup.Item action onClick={hideModal}>
            Cancel
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileHeaderUserStatusModal;
