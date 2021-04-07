import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { projectFirestore } from "../../../firebase/config";
import requester from "../../../firebase/requester";
import ProfileHeaderUserStatusModal from "../ProfileHeaderUserStatusModal";
import { useAuth } from "../../../utils/authProvider";

function ProfileHeaderFollowingModal({ showModal, hideModal, userFollowing }) {
  const [postCreatorFollowing, setPostCreatorFollowing] = useState([]);
  const [showUserStatusModal, setShowUserStatusModal] = useState(false);
  const [clickedUserId, setClickedUserId] = useState();
  const [clickedUser, setClickedUser] = useState({});
  const history = useHistory();
  const { authUser } = useAuth();

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
    if (clickedUserId == null) return;

    requester
      .get("instagramUsers", clickedUserId)
      .then((res) => {
        setClickedUser({ id: res.id, ...res.data() });
      })
      .catch(console.error);
  }, [clickedUserId]);

  const goToUserProfile = (followingId) => {
    history.push(`/profile/${followingId}`);
    hideModal();
  };

  return (
    <>
      <Modal show={showModal} onHide={hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="profile-header-following-title">
            Following
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {postCreatorFollowing.map((following) => {
            return (
              <div
                key={following.id + Math.random()}
                className="profile-header-following-container"
              >
                <img
                  src={following.profileImage}
                  alt="following"
                  className="profile-header-following-img"
                  onClick={() => goToUserProfile(following.id)}
                />
                <div className="profile-header-following-text">
                  <strong onClick={() => goToUserProfile(following.id)}>
                    {following.username}
                  </strong>
                  <p className="text-muted">{following.fullName}</p>
                </div>
                {authUser.uid !== following.id && (
                  <button
                    className="profile-header-following-button"
                    onClick={() => {
                      setClickedUserId(following.id);
                      setShowUserStatusModal(true);
                    }}
                  >
                    Following
                  </button>
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

export default ProfileHeaderFollowingModal;
