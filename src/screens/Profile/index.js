import React, { useState, useEffect } from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileNavbar from "../../components/Profile/ProfileNavbar";
import ProfileActivities from "../../components/Profile/ProfileActivities";
import { projectFirestore } from "../../firebase/config";
import requester from "../../firebase/requester";

const Profile = ({ match }) => {
  const userId = match.params.id;
  const [openPosts, setOpenPosts] = useState(true);
  const [openChannel, setOpenChannel] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);
  const [openTagged, setOpenTagged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserPosts, setCurrentUserPosts] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(userId)
      .onSnapshot((snapshot) => {
        setCurrentUser({ id: snapshot.id, ...snapshot.data() });
      });

    return () => unsub();
  }, [userId]);

  useEffect(() => {
    const unsub = requester
      .getByCriteria("posts", "creator", userId)
      .then((res) => {
        setCurrentUserPosts(
          res.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });

    return () => unsub;
  }, [userId]);

  return (
    <div className="user-profile-container">
      {currentUser && (
        <ProfileHeader
          currentUser={currentUser}
          currentUserPosts={currentUserPosts}
        />
      )}
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
