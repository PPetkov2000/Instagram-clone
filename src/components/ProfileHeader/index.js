import React, { useState, useEffect, useContext } from "react";
import { BsGearWide } from "react-icons/bs";
import ProfileHeaderImageModal from "../ProfileHeaderImageModal";
import ProfileHeaderSettingsModal from "../ProfileHeaderSettingsModal";
import { projectFirestore } from "../../firebase/config";

const ProfileHeader = ({ userId }) => {
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [userPosts, setUserPosts] = useState();
  const [userFollowers, setUserFollowers] = useState();
  const [userFollowing, setUserFollowing] = useState();
  const [currentUser, setCurrentUser] = useState();

  const showProfileImageOptions = () => setShowProfileImage(true);
  const hideProfileImageOptions = () => setShowProfileImage(false);

  const showProfileSettingsOptions = () => setShowProfileSettings(true);
  const hideProfileSettingsOptions = () => setShowProfileSettings(false);

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
      .get()
      .then((res) => {
        setUserFollowers(res.data().followers.length);
        setUserFollowing(res.data().following.length);
        setCurrentUser(res.data());
      })
      .catch(console.error);

    return () => unsub;
  }, [userId]);

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
          <button className="user-profile-edit-button">Edit Profile</button>
          <BsGearWide
            className="user-profile-settings"
            onClick={showProfileSettingsOptions}
          />
        </div>
        <div className="user-profile-information-content">
          <p>
            <strong>{userPosts}</strong> posts
          </p>
          <p>
            <strong>{userFollowers}</strong> followers
          </p>
          <p>
            <strong>{userFollowing}</strong> following
          </p>
        </div>
        <div className="user-profile-information-content">
          <strong>{currentUser && currentUser.fullName}</strong>
        </div>
      </div>
      <ProfileHeaderImageModal
        showProfileImage={showProfileImage}
        hideProfileImageOptions={hideProfileImageOptions}
      />
      <ProfileHeaderSettingsModal
        showProfileSettings={showProfileSettings}
        hideProfileSettingsOptions={hideProfileSettingsOptions}
      />
    </header>
  );
};

export default ProfileHeader;
