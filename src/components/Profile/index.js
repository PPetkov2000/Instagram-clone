import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader";
import ProfileNavbar from "../ProfileNavbar";
import ProfileActivities from "../ProfileActivities";

const Profile = () => {
  const [openPosts, setOpenPosts] = useState(true);
  const [openChannel, setOpenChannel] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);
  const [openTagged, setOpenTagged] = useState(false);

  return (
    <div className="user-profile-container">
      <ProfileHeader />
      <ProfileNavbar
        openPosts={openPosts}
        openChannel={openChannel}
        openSaved={openSaved}
        openTagged={openTagged}
        setOpenPosts={setOpenPosts}
        setOpenChannel={setOpenChannel}
        setOpenSaved={setOpenSaved}
        setOpenTagged={setOpenTagged}
      />
      <ProfileActivities
        openPosts={openPosts}
        openChannel={openChannel}
        openSaved={openSaved}
        openTagged={openTagged}
      />
      <footer className="user-profile-footer">
        <h5>@Instagram</h5>
      </footer>
    </div>
  );
};

export default Profile;
