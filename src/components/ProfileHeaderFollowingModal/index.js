import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";
import { GlobalStateContext } from "../../utils/context";
import requester from "../../firebase/requester";

function ProfileHeaderFollowingModal({ showModal, hideModal, userFollowing }) {
  const [postCreatorFollowing, setPostCreatorFollowing] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const history = useHistory();
  const context = useContext(GlobalStateContext);
  const uid = context && context.uid;

  useEffect(() => {
    setPostCreatorFollowing(
      userFollowing.reduce((result, followingId) => {
        projectFirestore
          .collection("instagramUsers")
          .doc(followingId)
          .onSnapshot((snapshot) => {
            result.push({ id: followingId, ...snapshot.data() });
          });

        return result;
      }, [])
    );
  }, [userFollowing]);

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

  const followUser = (e) => {
    if (uid == null) return;

    const userId = e.target.dataset.id;

    Promise.all([
      requester.get("instagramUsers", uid),
      requester.get("instagramUsers", userId),
    ])
      .then(([currentUser, followedUser]) => {
        const currentUserFollowing = currentUser.data().following;
        const followedUserFollowers = followedUser.data().followers;
        const followedUserNotifications = followedUser.data().notifications;

        currentUserFollowing.push(userId);
        followedUserFollowers.push(uid);
        followedUserNotifications.push({
          id: currentUser.id,
          username: currentUser.data().username,
          profileImage: currentUser.data().profileImage,
          timestamp: new Date(),
          type: "follower",
        });

        return Promise.all([
          requester.update("instagramUsers", uid, {
            following: currentUserFollowing,
          }),
          requester.update("instagramUsers", userId, {
            followers: followedUserFollowers,
            notifications: followedUserNotifications,
          }),
        ]);
      })
      .catch(console.error);
  };

  const goToUserProfile = (e) => {
    history.push(`/profile/${e.target.dataset.id}`);
    hideModal();
  };

  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title className="profile-header-following-title">
          Following
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {postCreatorFollowing.map((follow) => {
          return (
            <div
              key={follow.email}
              className="profile-header-following-container"
            >
              <img
                src={follow.profileImage}
                alt="following"
                className="profile-header-following-img"
                data-id={follow.id}
                onClick={goToUserProfile}
              />
              <div className="profile-header-following-text">
                <strong onClick={goToUserProfile} data-id={follow.id}>
                  {follow.username}
                </strong>
                <p className="text-muted">{follow.fullName}</p>
              </div>
              {uid !== follow.id && (
                <>
                  {currentUserFollowing.includes(follow.id) ? (
                    <button className="profile-header-following-button">
                      Following
                    </button>
                  ) : (
                    <button
                      className="profile-header-following-button"
                      data-id={follow.id}
                      onClick={followUser}
                    >
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

export default ProfileHeaderFollowingModal;
