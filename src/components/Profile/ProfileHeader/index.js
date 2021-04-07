import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BsGearWide, BsFillPersonCheckFill, BsThreeDots } from "react-icons/bs";
import ProfileHeaderImageModal from "../ProfileHeaderImageModal";
import ProfileHeaderSettingsModal from "../ProfileHeaderSettingsModal";
import ProfileHeaderFollowersModal from "../ProfileHeaderFollowersModal";
import ProfileHeaderFollowingModal from "../ProfileHeaderFollowingModal";
import ProfileHeaderUserStatusModal from "../ProfileHeaderUserStatusModal";
import ProfileHeaderRestrictUserModal from "../ProfileHeaderRestrictUserModal";
import { projectFirestore } from "../../../firebase/config";
import { useAuth } from "../../../utils/authProvider";
import { followUser } from "../../../utils/userActions";

const ProfileHeader = ({ currentUser, currentUserPosts }) => {
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showProfileFollowers, setShowProfileFollowers] = useState(false);
  const [showProfileFollowing, setShowProfileFollowing] = useState(false);
  const [showProfileUserStatus, setShowProfileUserStatus] = useState(false);
  const [showProfileRestrictUser, setShowProfileRestrictUser] = useState(false);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const history = useHistory();
  const { authUser } = useAuth();

  const showProfileImageOptions = () => {
    if (currentUser.id === authUser.uid) {
      setShowProfileImage(true);
    }
  };
  const hideProfileImageOptions = () => setShowProfileImage(false);

  const showProfileSettingsOptions = () => setShowProfileSettings(true);
  const hideProfileSettingsOptions = () => setShowProfileSettings(false);

  const showProfileFollowersModal = () => setShowProfileFollowers(true);
  const hideProfileFollowersModal = () => setShowProfileFollowers(false);

  const showProfileFollowingModal = () => setShowProfileFollowing(true);
  const hideProfileFollowingModal = () => setShowProfileFollowing(false);

  const showProfileUserStatusModal = () => setShowProfileUserStatus(true);
  const hideProfileUserStatusModal = () => setShowProfileUserStatus(false);

  const showProfileRestrictUserModal = () => setShowProfileRestrictUser(true);
  const hideProfileRestrictUserModal = () => setShowProfileRestrictUser(false);

  useEffect(() => {
    if (!authUser) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(authUser.uid)
      .onSnapshot((snapshot) => {
        setIsFollowingUser(snapshot.data().following.includes(currentUser.id));
      });

    return () => unsub();
  }, [authUser, currentUser.id]);

  return (
    <header className="user-profile-header">
      <div className="user-profile-img-container">
        <img
          src={currentUser.profileImage}
          alt="user_icon"
          className="user-profile-img"
          onClick={showProfileImageOptions}
        />
      </div>
      <div className="user-profile-information">
        <div className="user-profile-information-content">
          <h3>{currentUser.username}</h3>
          {currentUser.id === authUser?.uid ? (
            <>
              <button
                className="user-profile-edit-button"
                onClick={() => history.push(`/edit/${authUser.uid}`)}
              >
                Edit Profile
              </button>
              <BsGearWide
                className="user-profile-settings"
                onClick={showProfileSettingsOptions}
              />{" "}
            </>
          ) : (
            <>
              {isFollowingUser ? (
                <>
                  <button
                    className="user-profile-message-button"
                    onClick={() => history.push("/messages")}
                  >
                    Message
                  </button>
                  <button
                    className="user-profile-follow-button-options"
                    onClick={showProfileUserStatusModal}
                  >
                    <BsFillPersonCheckFill />
                  </button>
                </>
              ) : (
                <button
                  className="user-profile-follow-button"
                  onClick={() => followUser(authUser, currentUser.id)}
                >
                  Follow
                </button>
              )}
              <button
                className="user-profile-modal-button"
                onClick={showProfileRestrictUserModal}
              >
                <BsThreeDots />
              </button>
            </>
          )}
        </div>
        <div className="user-profile-information-content">
          <p>
            <strong>{currentUserPosts.length}</strong> posts
          </p>
          <p onClick={showProfileFollowersModal} style={{ cursor: "pointer" }}>
            <strong>
              {currentUser.followers && currentUser.followers.length}
            </strong>{" "}
            followers
          </p>
          <p onClick={showProfileFollowingModal} style={{ cursor: "pointer" }}>
            <strong>
              {currentUser.following && currentUser.following.length}
            </strong>{" "}
            following
          </p>
        </div>
        <div className="user-profile-information-content">
          <strong>{currentUser.fullName}</strong>
        </div>
      </div>
      <ProfileHeaderImageModal
        showProfileImage={showProfileImage}
        hideProfileImageOptions={hideProfileImageOptions}
      />
      <ProfileHeaderSettingsModal
        showModal={showProfileSettings}
        hideModal={hideProfileSettingsOptions}
      />
      <ProfileHeaderUserStatusModal
        showModal={showProfileUserStatus}
        hideModal={hideProfileUserStatusModal}
        clickedUser={currentUser}
      />
      <ProfileHeaderRestrictUserModal
        showModal={showProfileRestrictUser}
        hideModal={hideProfileRestrictUserModal}
      />
      {currentUser.followers && (
        <ProfileHeaderFollowersModal
          showModal={showProfileFollowers}
          hideModal={hideProfileFollowersModal}
          userFollowers={currentUser.followers}
          followUser={followUser}
        />
      )}
      {currentUser.following && (
        <ProfileHeaderFollowingModal
          showModal={showProfileFollowing}
          hideModal={hideProfileFollowingModal}
          userFollowing={currentUser.following}
        />
      )}
    </header>
  );
};

export default ProfileHeader;
