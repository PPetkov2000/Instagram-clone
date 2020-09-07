import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";
import { GlobalStateContext } from "../../context";

function ProfileHeaderFollowersModal({ showModal, hideModal, userFollowers }) {
  const [postCreatorFollowers, setPostCreatorFollowers] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const context = useContext(GlobalStateContext);
  const uid = context && context.uid;

  useEffect(() => {
    setPostCreatorFollowers(
      userFollowers.reduce((result, followerId) => {
        projectFirestore
          .collection("instagramUsers")
          .doc(followerId)
          .onSnapshot((snapshot) => {
            result.push({
              id: followerId,
              username: snapshot.data().username,
              fullName: snapshot.data().fullName,
              profileImage: snapshot.data().profileImage,
            });
          });

        return result;
      }, [])
    );
  }, [userFollowers]);

  useEffect(() => {
    if (uid == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setCurrentUserFollowing(snapshot.data().following);
      });

    return () => unsub();
  }, [uid]);

  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title className="profile-header-followers-title">
          Followers
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {postCreatorFollowers.map((follower) => {
          return (
            <div
              key={follower.id}
              className="profile-header-followers-container"
            >
              <img
                src={follower.profileImage}
                alt="follower"
                className="profile-header-followers-img"
              />
              <div className="profile-header-followers-text">
                <strong>{follower.username}</strong>
                <p className="text-muted">{follower.fullName}</p>
              </div>
              {uid !== follower.id && (
                <>
                  {currentUserFollowing.includes(follower.id) ? (
                    <button className="profile-header-followers-button">
                      Following
                    </button>
                  ) : (
                    <button className="profile-header-followers-button">
                      Follow
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </Modal.Body>
    </Modal>
  );
}

export default ProfileHeaderFollowersModal;
