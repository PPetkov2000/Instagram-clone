import React, { useState } from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileNavbar from "../../components/Profile/ProfileNavbar";
import ProfileActivities from "../../components/Profile/ProfileActivities";

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
        userId={userId}
      />
      <ProfileActivities
        openPosts={openPosts}
        openChannel={openChannel}
        openSaved={openSaved}
        openTagged={openTagged}
        userId={userId}
      />
      <footer className="user-profile-footer">
        <h5>@Instagram 2020</h5>
      </footer>
    </div>
  );
};

export default Profile;
