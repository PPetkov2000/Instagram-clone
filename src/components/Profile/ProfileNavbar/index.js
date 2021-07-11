import React from "react";
import { BsGrid3X3, BsBookmark, BsPersonSquare, BsTv } from "react-icons/bs";
import { useAuth } from "../../../contexts/authProvider";

const ProfileNavbar = ({
  openPosts,
  openChannel,
  openSaved,
  openTagged,
  openPostsHandler,
  openChannelHandler,
  openSavedHandler,
  openTaggedHandler,
  currentUserId,
}) => {
  const { authUser } = useAuth();

  return (
    <nav className="user-profile-navbar">
      <a
        href="#posts"
        className={openPosts ? "profile-navbar-active" : ""}
        onClick={openPostsHandler}
      >
        <BsGrid3X3 className="user-profile-navbar-icon" /> posts
      </a>
      {authUser && authUser.uid === currentUserId && (
        <>
          <a
            href="#channel"
            className={openChannel ? "profile-navbar-active" : ""}
            onClick={openChannelHandler}
          >
            <BsTv className="user-profile-navbar-icon" /> igtv
          </a>
          <a
            href="#saved"
            className={openSaved ? "profile-navbar-active" : ""}
            onClick={openSavedHandler}
          >
            <BsBookmark className="user-profile-navbar-icon" /> saved
          </a>
        </>
      )}
      <a
        href="#tagged"
        className={openTagged ? "profile-navbar-active" : ""}
        onClick={openTaggedHandler}
      >
        <BsPersonSquare className="user-profile-navbar-icon" /> tagged
      </a>
    </nav>
  );
};

export default ProfileNavbar;
