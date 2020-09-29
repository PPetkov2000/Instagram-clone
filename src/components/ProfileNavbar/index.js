import React from "react";
import { BsGrid3X3, BsBookmark, BsPersonSquare, BsTv } from "react-icons/bs";
import { useGlobalContext } from "../../utils/context";

const ProfileNavbar = ({
  openPosts,
  openChannel,
  openSaved,
  openTagged,
  setOpenPosts,
  setOpenChannel,
  setOpenSaved,
  setOpenTagged,
  userId,
}) => {
  const context = useGlobalContext();
  const uid = context && context.uid;

  const openProfilePosts = () => {
    setOpenPosts(true);
    setOpenChannel(false);
    setOpenSaved(false);
    setOpenTagged(false);
  };
  const openProfileChannel = () => {
    setOpenPosts(false);
    setOpenChannel(true);
    setOpenSaved(false);
    setOpenTagged(false);
  };
  const openProfileSaved = () => {
    setOpenPosts(false);
    setOpenChannel(false);
    setOpenSaved(true);
    setOpenTagged(false);
  };
  const openProfileTagged = () => {
    setOpenPosts(false);
    setOpenChannel(false);
    setOpenSaved(false);
    setOpenTagged(true);
  };

  return (
    <nav className="user-profile-navbar">
      <a
        href="#posts"
        className={openPosts ? "profile-navbar-active" : ""}
        onClick={openProfilePosts}
      >
        <BsGrid3X3 className="user-profile-navbar-icon" /> posts
      </a>
      {userId === uid && (
        <>
          <a
            href="#channel"
            className={openChannel ? "profile-navbar-active" : ""}
            onClick={openProfileChannel}
          >
            <BsTv className="user-profile-navbar-icon" /> igtv
          </a>
          <a
            href="#saved"
            className={openSaved ? "profile-navbar-active" : ""}
            onClick={openProfileSaved}
          >
            <BsBookmark className="user-profile-navbar-icon" /> saved
          </a>
        </>
      )}
      <a
        href="#tagged"
        className={openTagged ? "profile-navbar-active" : ""}
        onClick={openProfileTagged}
      >
        <BsPersonSquare className="user-profile-navbar-icon" /> tagged
      </a>
    </nav>
  );
};

export default ProfileNavbar;
