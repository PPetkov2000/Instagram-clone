import React, { useState, useContext, useEffect } from "react";
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
import { GlobalStateContext } from "../../utils/context";
import PostNavbarModal from "../PostNavbarModal";
import requester from "../../firebase/requester";

const PostNavbar = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const context = useContext(GlobalStateContext);
  const email = context && context.email;
  const uid = context && context.uid;

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .doc(postId)
      .onSnapshot((snapshot) => {
        if (snapshot.data().likes.includes(email)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });

    return () => unsub();
  }, [postId, email]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        if (snapshot.data().saved.includes(postId)) {
          setSaved(true);
        } else {
          setSaved(false);
        }
      });

    return () => unsub();
  }, [uid, postId]);

  const likeAndDislikePost = () => {
    requester
      .get("posts", postId)
      .then((res) => {
        let likes = res.data().likes;

        if (!likes.includes(email)) {
          likes.push(email);
        } else {
          likes = likes.filter((x) => x !== email);
        }

        return requester.update("posts", postId, { likes });
      })
      .catch(console.error);
  };

  const saveAndUnSavePost = () => {
    requester
      .get("instagramUsers", uid)
      .then((res) => {
        let saved = res.data().saved;

        if (!saved.includes(postId)) {
          saved.push(postId);
        } else {
          saved = saved.filter((x) => x !== postId);
        }

        return requester.update("instagramUsers", uid, { saved });
      })
      .catch(console.error);
  };

  const showOptions = () => setShowModal(true);
  const hideOptions = () => setShowModal(false);

  const openPostDetails = () => {
    history.push(`/post-comments-details/${postId}`);
  };

  return (
    <>
      <Navbar className="posts-navbar">
        <Nav>
          <Nav.Link
            href="#like"
            className="nav-icon"
            onClick={likeAndDislikePost}
          >
            {liked ? <FcLike /> : <BsHeart />}
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
          <Nav.Link
            href="#bookmark"
            className="nav-icon"
            onClick={saveAndUnSavePost}
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
