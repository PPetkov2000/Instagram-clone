import React from "react";
import { Modal, ListGroup } from "react-bootstrap";
import requester from "../../../firebase/requester";
import { useGlobalContext } from "../../../utils/context";

function ProfileHeaderUserStatusModal({ showModal, hideModal, clickedUser }) {
  const authUser = useGlobalContext();

  const unfollowUser = () => {
    Promise.all([
      requester.get("instagramUsers", authUser.uid),
      requester.get("instagramUsers", clickedUser.id),
    ])
      .then(([currentUser, unfollowedUser]) => {
        let currentUserFollowing = currentUser.data().following;
        let unfollowedUserFollowers = unfollowedUser.data().followers;
        let unfollowedUserNotifications = unfollowedUser.data().notifications;

        currentUserFollowing = currentUserFollowing.filter(
          (x) => x !== clickedUser.id
        );
        unfollowedUserFollowers = currentUserFollowing.filter(
          (x) => x !== authUser.uid
        );
        unfollowedUserNotifications = unfollowedUserNotifications.filter(
          (x) => x.id !== authUser.uid
        );

        return Promise.all([
          requester.update("instagramUsers", authUser.uid, {
            following: currentUserFollowing,
          }),
          requester.update("instagramUsers", clickedUser.id, {
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
          src={clickedUser?.profileImage}
          alt="modal"
          className="profile-header-user-status-img"
        />
        <p>
          If you change your mind, you'll have to request to follow @
          {clickedUser?.username} again.
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
