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

const PostNavbar = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const context = useContext(GlobalStateContext);
  const uid = context && context.uid;

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .doc(post.id)
      .onSnapshot((snapshot) => {
        setLiked(snapshot.data().likes.includes(uid));
      });

    return () => unsub();
  }, [post.id, uid]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setSaved(snapshot.data().saved.includes(post.id));
      });

    return () => unsub();
  }, [uid, post.id]);

  const likeAndDislikePost = () => {
    Promise.all([
      requester.get("posts", post.id),
      requester.get("instagramUsers", post.creator),
    ])
      .then(([currentPost, currentUser]) => {
        let currentPostLikes = currentPost.data().likes;
        let currentUserNotifications = currentUser.data().notifications;

        if (!currentPostLikes.includes(uid)) {
          currentPostLikes.push(uid);
          currentUserNotifications.push({
            id: uid,
            username: context.username,
            profileImage: context.profileImage,
            timestamp: new Date(),
            type: "like",
            postId: post.id,
            postImageUrl: post.imageUrl,
          });
        } else {
          currentPostLikes = currentPostLikes.filter((x) => x !== uid);
          currentUserNotifications = currentUserNotifications.filter(
            (x) => x.id !== uid
          );
        }

        return Promise.all([
          requester.update("posts", post.id, { likes: currentPostLikes }),
          requester.update("instagramUsers", post.creator, {
            notifications: currentUserNotifications,
          }),
        ]);
      })
      .catch(console.error);
  };

  const saveAndUnSavePost = () => {
    requester
      .get("instagramUsers", uid)
      .then((res) => {
        let saved = res.data().saved;

        if (!saved.includes(post.id)) {
          saved.push(post.id);
        } else {
          saved = saved.filter((x) => x !== post.id);
        }

        return requester.update("instagramUsers", uid, { saved });
      })
      .catch(console.error);
  };

  const showOptions = () => setShowModal(true);
  const hideOptions = () => setShowModal(false);

  const openPostDetails = () => {
    history.push(`/post-comments-details/${post.id}`);
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
