<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { BsHeart, BsCursor, BsChat, BsBookmark } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { projectFirestore } from "../../firebase/config";
import { GlobalStateContext } from "../../context";
import PostNavbarModal from "../PostNavbarModal";
=======
import React from "react";
import { BsGrid3X3, BsBookmark, BsPersonSquare, BsTv } from "react-icons/bs";
>>>>>>> 469353415f39f02cc922b729abfa8e92fefd8d40

const ProfileNavbar = ({
  openPosts,
  openChannel,
  openSaved,
  openTagged,
  setOpenPosts,
  setOpenChannel,
  setOpenSaved,
  setOpenTagged,
}) => {
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
<<<<<<< HEAD
    <>
      <Navbar className="posts-navbar">
        <Nav>
          <Nav.Link href="#like" className="nav-icon" onClick={likePost}>
            {active ? <FcLike /> : <BsHeart />}
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="nav-icon" onClick={openPostDetails}>
            <BsChat />
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#options" className="nav-icon" onClick={showOptions}>
            <BsCursor />
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#bookmark" className="nav-icon">
            <BsBookmark />
          </Nav.Link>
        </Nav>
      </Navbar>

      <PostNavbarModal showModal={showModal} hideOptions={hideOptions} />
    </>
=======
    <nav className="user-profile-navbar">
      <a
        href="#posts"
        className={openPosts && "profile-navbar-active"}
        onClick={openProfilePosts}
      >
        <BsGrid3X3 className="user-profile-navbar-icon" /> posts
      </a>
      <a
        href="#channel"
        className={openChannel && "profile-navbar-active"}
        onClick={openProfileChannel}
      >
        <BsTv className="user-profile-navbar-icon" /> igtv
      </a>
      <a
        href="#saved"
        className={openSaved && "profile-navbar-active"}
        onClick={openProfileSaved}
      >
        <BsBookmark className="user-profile-navbar-icon" /> saved
      </a>
      <a
        href="#tagged"
        className={openTagged && "profile-navbar-active"}
        onClick={openProfileTagged}
      >
        <BsPersonSquare className="user-profile-navbar-icon" /> tagged
      </a>
    </nav>
>>>>>>> 469353415f39f02cc922b729abfa8e92fefd8d40
  );
};

export default ProfileNavbar;
