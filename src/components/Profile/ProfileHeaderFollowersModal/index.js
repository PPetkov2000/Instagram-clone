import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { projectFirestore } from "../../../firebase/config";
import { useGlobalContext } from "../../../utils/context";
import requester from "../../../firebase/requester";
import ProfileHeaderUserStatusModal from "../ProfileHeaderUserStatusModal";

function ProfileHeaderFollowersModal({
  showModal,
  hideModal,
  userFollowers,
  followUser,
}) {
  const [postCreatorFollowers, setPostCreatorFollowers] = useState([]);
  const [authUserFollowing, setAuthUserFollowing] = useState([]);
  const [showUserStatusModal, setShowUserStatusModal] = useState(false);
  const [clickedUser, setClickedUser] = useState({});
  const history = useHistory();
  const authUser = useGlobalContext();

  useEffect(() => {
    if (authUser == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(authUser.uid)
      .onSnapshot((snapshot) => {
        setAuthUserFollowing(snapshot.data().following);
      });

    return () => unsub();
  }, [authUser]);

  useEffect(() => {
    userFollowers.forEach((followerId) => {
      requester
        .get("instagramUsers", followerId)
        .then((res) => {
          setPostCreatorFollowers((prevFollowers) => {
            return [...prevFollowers, { id: res.id, ...res.data() }];
          });
        })
        .catch(console.error);
    });
  }, [userFollowers]);

  const goToUserProfile = (followerId) => {
    history.push(`/profile/${followerId}`);
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
                  onClick={() => goToUserProfile(follower.id)}
                />
                <div className="profile-header-followers-text">
                  <strong onClick={() => goToUserProfile(follower.id)}>
                    {follower.username}
                  </strong>
                  <p className="text-muted">{follower.fullName}</p>
                </div>
                {authUser && authUser.uid !== follower.id && (
                  <>
                    {authUserFollowing.includes(follower.id) ? (
                      <button
                        className="profile-header-followers-button"
                        onClick={() => {
                          setClickedUser(follower);
                          setShowUserStatusModal(true);
                        }}
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        className="profile-header-followers-button"
                        onClick={() => followUser(follower.id)}
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
        clickedUser={clickedUser}
      />
    </>
  );
}

export default ProfileHeaderFollowersModal;
