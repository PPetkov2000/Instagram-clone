import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { projectFirestore } from "../../../firebase/config";
import { useGlobalContext } from "../../../utils/context";
import requester from "../../../firebase/requester";
import ProfileHeaderUserStatusModal from "../ProfileHeaderUserStatusModal";

function ProfileHeaderFollowersModal({ showModal, hideModal, userFollowers }) {
  const [postCreatorFollowers, setPostCreatorFollowers] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [showUserStatusModal, setShowUserStatusModal] = useState(false);
  const [clickedUserId, setClickedUserId] = useState();
  const [clickedUser, setClickedUser] = useState();
  const history = useHistory();
  const context = useGlobalContext();
  const uid = context && context.uid;

  useEffect(() => {
    setPostCreatorFollowers(
      userFollowers.reduce((result, followerId) => {
        projectFirestore
          .collection("instagramUsers")
          .doc(followerId)
          .onSnapshot((snapshot) => {
            result.push({ id: followerId, ...snapshot.data() });
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

  useEffect(() => {
    if (clickedUserId == null) return;

    requester
      .get("instagramUsers", clickedUserId)
      .then((res) => {
        setClickedUser({ id: res.id, ...res.data() });
      })
      .catch(console.error);
  }, [clickedUserId]);

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
    <>
      <Modal show={showModal} onHide={hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="profile-header-followers-title">
            Followers
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {postCreatorFollowers.map((follower) => {
            return (
              <div
                key={follower.id + Math.random()}
                className="profile-header-followers-container"
              >
                <img
                  src={follower.profileImage}
                  alt="follower"
                  className="profile-header-followers-img"
                  data-id={follower.id}
                  onClick={goToUserProfile}
                />
                <div className="profile-header-followers-text">
                  <strong onClick={goToUserProfile} data-id={follower.id}>
                    {follower.username}
                  </strong>
                  <p className="text-muted">{follower.fullName}</p>
                </div>
                {uid !== follower.id && (
                  <>
                    {currentUserFollowing.includes(follower.id) ? (
                      <button
                        className="profile-header-followers-button"
                        data-id={follower.id}
                        onClick={(e) => {
                          setClickedUserId(e.target.dataset.id);
                          setShowUserStatusModal(true);
                        }}
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        className="profile-header-followers-button"
                        data-id={follower.id}
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

      <ProfileHeaderUserStatusModal
        showModal={showUserStatusModal}
        hideModal={() => setShowUserStatusModal(false)}
        userId={clickedUserId}
        uid={uid}
        userProfileImage={clickedUser && clickedUser.profileImage}
        username={clickedUser && clickedUser.username}
      />
    </>
  );
}

export default ProfileHeaderFollowersModal;