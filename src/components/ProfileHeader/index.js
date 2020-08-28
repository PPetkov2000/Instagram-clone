import React, { useState } from "react";
import { BsGearWide } from "react-icons/bs";
import ProfileHeaderImageModal from "../ProfileHeaderImageModal";
import ProfileHeaderSettingsModal from "../ProfileHeaderSettingsModal";

const ProfileHeader = () => {
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const showProfileImageOptions = () => setShowProfileImage(true);
  const hideProfileImageOptions = () => setShowProfileImage(false);

  const showProfileSettingsOptions = () => setShowProfileSettings(true);
  const hideProfileSettingsOptions = () => setShowProfileSettings(false);

  return (
    <header className="user-profile-header">
      <div className="user-profile-img-container">
        <img
          src="/images/user_icon.png"
          alt="user_icon"
          className="user-profile-img"
          onClick={showProfileImageOptions}
        />
      </div>
      <div className="user-profile-information">
        <div className="user-profile-information-content">
          <h3>my_profile</h3>
          <button className="user-profile-edit-button">Edit Profile</button>
          <BsGearWide
            className="user-profile-settings"
            onClick={showProfileSettingsOptions}
          />
        </div>
        <div className="user-profile-information-content">
          <p>
            <strong>10</strong> posts
          </p>
          <p>
            <strong>100</strong> followers
          </p>
          <p>
            <strong>50</strong> following
          </p>
        </div>
        <div className="user-profile-information-content">
          <strong>My Profile</strong>
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
