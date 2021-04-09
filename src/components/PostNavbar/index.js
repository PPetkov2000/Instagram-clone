import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import {
  BsHeart,
  BsCursor,
  BsChat,
  BsBookmark,
  BsFillBookmarkFill,
} from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { projectFirestore } from "../../firebase/config";
import { useAuth } from "../../utils/authProvider";
import PostNavbarModal from "../PostNavbarModal";
import { likeAndDislikePost, saveAndUnSavePost } from "../../utils/userActions";

const PostNavbar = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { authUser } = useAuth();
  const authUserId = authUser && authUser.uid;

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .doc(post.id)
      .onSnapshot((snapshot) => {
        setLiked(snapshot.data().likes.includes(authUserId));
      });

    return () => unsub();
  }, [post.id, authUserId]);

  useEffect(() => {
    if (authUserId == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(authUserId)
      .onSnapshot((snapshot) => {
        setSaved(snapshot.data().saved.includes(post.id));
      });

    return () => unsub();
  }, [authUserId, post.id]);

  const showOptions = () => setShowModal(true);
  const hideOptions = () => setShowModal(false);

  const openPostDetails = () => {
    history.push(`/post-comments-details/${post.id}`);
  };

  return (
    <>
      <Navbar className="posts-navbar">
        <Nav className="posts-navbar__links">
          <Nav.Link
            href="#like"
            className="nav-icon"
            onClick={() => likeAndDislikePost(authUser, post)}
          >
            {liked ? <FcLike /> : <BsHeart />}
          </Nav.Link>

          <Nav.Link className="nav-icon" onClick={openPostDetails}>
            <BsChat />
          </Nav.Link>
          <Nav.Link href="#options" className="nav-icon" onClick={showOptions}>
            <BsCursor />
          </Nav.Link>
          <Nav.Link
            href="#bookmark"
            className="nav-icon posts-navbar__nav"
            onClick={() => saveAndUnSavePost(authUser, post.id)}
          >
            {saved ? <BsFillBookmarkFill /> : <BsBookmark />}
          </Nav.Link>
        </Nav>
      </Navbar>

      <PostNavbarModal showModal={showModal} hideOptions={hideOptions} />
    </>
  );
};

export default PostNavbar;
