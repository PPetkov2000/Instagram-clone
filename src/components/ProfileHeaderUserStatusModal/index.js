import React from "react";
import { Modal, ListGroup } from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";

function ProfileHeaderUserStatusModal({
  showModal,
  hideModal,
  userId,
  uid,
  userProfileImage,
  username,
}) {
  const unfollowUser = () => {
    projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .get()
      .then((res) => {
        let following = res.data().following;
        following = following.filter((x) => x !== userId);

        projectFirestore
          .collection("instagramUsers")
          .doc(userId)
          .get()
          .then((res) => {
            let followers = res.data().followers;
            followers = followers.filter((x) => x !== uid);

            projectFirestore
              .collection("instagramUsers")
              .doc(userId)
              .update({ followers });
          })
          .catch(console.error);

        return projectFirestore
          .collection("instagramUsers")
          .doc(uid)
          .update({ following });
      });

    hideModal();
  };

  return (
    <Modal show={showModal} onHide={hideModal}>
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
