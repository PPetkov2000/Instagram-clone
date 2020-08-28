import React from "react";

const ProfilePosts = () => {
  return (
    <>
      <img src="/images/profile_image.jpg" alt="profile" />
      <div className="user-profile-activities-content">
        <h5>Start capturing and sharing your moments.</h5>
        <p>Get the app to share your first photo or video.</p>
        <div className="user-profile-buttons">
          <a href="#icon" alt="icon">
            <img src="/images/app_store_icon.png" alt="app-store" />
          </a>
          <a href="#icon" alt="icon">
            <img src="/images/google_play_icon.png" alt="google-play" />
          </a>
        </div>
      </div>
    </>
  );
};

export default ProfilePosts;
