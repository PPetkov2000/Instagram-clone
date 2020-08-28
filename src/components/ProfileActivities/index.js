import React from "react";
import ProfilePosts from "../ProfilePosts";
import ProfileChannel from "../ProfileChannel";
import ProfileSaved from "../ProfileSaved";
import ProfileTagged from "../ProfileTagged";

const ProfileActivities = ({
  openPosts,
  openChannel,
  openSaved,
  openTagged,
}) => {
  return (
    <div className="user-profile-activities">
      {openPosts && <ProfilePosts />}
      {openChannel && <ProfileChannel />}
      {openSaved && <ProfileSaved />}
      {openTagged && <ProfileTagged />}
    </div>
  );
};

export default ProfileActivities;
