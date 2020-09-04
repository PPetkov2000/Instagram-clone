import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader";
import ProfileNavbar from "../ProfileNavbar";
import ProfileActivities from "../ProfileActivities";

const Profile = (props) => {
  const userId = props.match.params.id;
  const [openPosts, setOpenPosts] = useState(true);
  const [openChannel, setOpenChannel] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);
  const [openTagged, setOpenTagged] = useState(false);

  return (
    <div className="user-profile-container">
      <ProfileHeader userId={userId} />
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
        <h5>@Instagram 2020</h5>
      </footer>
    </div>
  );
};

export default Profile;