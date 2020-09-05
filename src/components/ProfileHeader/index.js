import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BsGearWide, BsFillPersonCheckFill, BsThreeDots } from "react-icons/bs";
import ProfileHeaderImageModal from "../ProfileHeaderImageModal";
import ProfileHeaderSettingsModal from "../ProfileHeaderSettingsModal";
import ProfileHeaderFollowersModal from "../ProfileHeaderFollowersModal";
import ProfileHeaderFollowingModal from "../ProfileHeaderFollowingModal";
import ProfileHeaderUserStatusModal from "../ProfileHeaderUserStatusModal";
import ProfileHeaderRestrictUserModal from "../ProfileHeaderRestrictUserModal";
import { projectFirestore } from "../../firebase/config";
import { GlobalStateContext } from "../../context";

const ProfileHeader = ({ userId }) => {
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showProfileFollowers, setShowProfileFollowers] = useState(false);
  const [showProfileFollowing, setShowProfileFollowing] = useState(false);
  const [showProfileUserStatus, setShowProfileUserStatus] = useState(false);
  const [showProfileRestrictUser, setShowProfileRestrictUser] = useState(false);
  const [userPosts, setUserPosts] = useState();
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [isFollowingUser, setIsFollowingUser] = useState();
  const history = useHistory();
  const context = useContext(GlobalStateContext);
  const uid = context && context.uid;

  const showProfileImageOptions = () => {
    if (userId === uid) {
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
    const unsub = projectFirestore
      .collection("posts")
      .where("creator", "==", userId)
      .get()
      .then((res) => {
        setUserPosts(res.docs.length);
      });

    return () => unsub;
  }, [userId]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(userId)
      .onSnapshot((snapshot) => {
        setUserFollowers(snapshot.data().followers);
        setUserFollowing(snapshot.data().following);
        setCurrentUser(snapshot.data());
      });

    return () => unsub();
  }, [userId]);

  useEffect(() => {
    if (uid == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        const following = snapshot.data().following;

        if (following.includes(userId)) {
          setIsFollowingUser(true);
        } else {
          setIsFollowingUser(false);
        }
      });

    return () => unsub();
  }, [uid, userId]);

  const followUser = () => {
    projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .get()
      .then((res) => {
        const following = res.data().following;
        following.push(userId);

        projectFirestore
          .collection("instagramUsers")
          .doc(userId)
          .get()
          .then((res) => {
            const followers = res.data().followers;
            followers.push(uid);

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
      })
      .catch(console.error);
  };

  return (
    <header className="user-profile-header">
      <div className="user-profile-img-container">
        <img
          src={currentUser && currentUser.profileImage}
          alt="user_icon"
          className="user-profile-img"
          onClick={showProfileImageOptions}
        />
      </div>
      <div className="user-profile-information">
        <div className="user-profile-information-content">
          <h3>{currentUser && currentUser.username}</h3>
          {userId === uid ? (
            <>
              <button className="user-profile-edit-button">Edit Profile</button>
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
                  onClick={followUser}
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
            <strong>{userPosts}</strong> posts
          </p>
          <p onClick={showProfileFollowersModal} style={{ cursor: "pointer" }}>
            <strong>{currentUser && currentUser.followers.length}</strong>{" "}
            followers
          </p>
          <p onClick={showProfileFollowingModal} style={{ cursor: "pointer" }}>
            <strong>{currentUser && currentUser.following.length}</strong>{" "}
            following
          </p>
        </div>
        <div className="user-profile-information-content">
          <strong>{currentUser && currentUser.fullName}</strong>
        </div>
      </div>
      <ProfileHeaderImageModal
        showProfileImage={showProfileImage}
        hideProfileImageOptions={hideProfileImageOptions}
        userId={userId}
      />
      <ProfileHeaderSettingsModal
        showProfileSettings={showProfileSettings}
        hideProfileSettingsOptions={hideProfileSettingsOptions}
      />
      <ProfileHeaderUserStatusModal
        showModal={showProfileUserStatus}
        hideModal={hideProfileUserStatusModal}
        userId={userId}
        uid={uid}
        userProfileImage={currentUser && currentUser.profileImage}
        username={currentUser && currentUser.username}
      />
      <ProfileHeaderRestrictUserModal
        showModal={showProfileRestrictUser}
        hideModal={hideProfileRestrictUserModal}
      />
      <ProfileHeaderFollowersModal
        showModal={showProfileFollowers}
        hideModal={hideProfileFollowersModal}
        userFollowers={userFollowers}
      />
      <ProfileHeaderFollowingModal
        showModal={showProfileFollowing}
        hideModal={hideProfileFollowingModal}
        userFollowing={userFollowing}
      />
    </header>
  );
};

export default ProfileHeader;
