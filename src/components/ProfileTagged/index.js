import React from "react";
import { BsPersonSquare } from "react-icons/bs";
import { useGlobalContext } from "../../utils/context";

const ProfileTagged = ({ userId }) => {
  const context = useGlobalContext();
  const uid = context && context.uid;

  return uid === userId ? (
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
  ) : (
    <div className="user-profile-activities-tagged-container">
      <div className="user-profile-activities-tagged-content">
        <BsPersonSquare className="user-profile-activities-tagged-icon" />
        <p className="user-profile-activities-tagged-text">No Photos</p>
      </div>
    </div>
  );
};

export default ProfileTagged;
