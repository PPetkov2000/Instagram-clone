import React from "react";
import { BsPersonSquare } from "react-icons/bs";

const ProfilePostsEmpty = () => {
  return (
    <div className="user-profile-activities-tagged-container">
      <div className="user-profile-activities-tagged-content">
        <BsPersonSquare className="user-profile-activities-tagged-icon" />
        <p className="user-profile-activities-tagged-text">No Photos</p>
      </div>
    </div>
  );
};

export default ProfilePostsEmpty;
