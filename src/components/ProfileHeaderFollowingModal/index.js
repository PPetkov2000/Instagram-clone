import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";

function ProfileHeaderFollowingModal({ showModal, hideModal, userFollowing }) {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    setFollowing(
      userFollowing.reduce((result, followingId) => {
        projectFirestore
          .collection("instagramUsers")
          .doc(followingId)
          .onSnapshot((snapshot) => {
            result.push({
              id: followingId,
              username: snapshot.data().username,
              fullName: snapshot.data().fullName,
              profileImage: snapshot.data().profileImage,
            });
          });

        return result;
      }, [])
    );
  }, [userFollowing]);

  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title className="profile-header-following-title">
          Following
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {following.map((follow) => {
          return (
            <div key={follow.id} className="profile-header-following-container">
              <img
                src={follow.profileImage}
                alt="following"
                className="profile-header-following-img"
              />
              <div className="profile-header-following-text">
                <strong>{follow.username}</strong>
                <p className="text-muted">{follow.fullName}</p>
              </div>
              <button className="profile-header-following-button">
                Following
              </button>
            </div>
          );
        })}
      </Modal.Body>
    </Modal>
  );
}

export default ProfileHeaderFollowingModal;
