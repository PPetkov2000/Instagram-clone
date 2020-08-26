import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Modal, ListGroup } from "react-bootstrap";
import { BsHeart, BsCursor, BsChat, BsBookmark } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { projectFirestore } from "../../firebase/config";
import { GlobalStateContext } from "../../context";

export default function PostNavbar({ postId }) {
  const { username } = useContext(GlobalStateContext);
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const likePost = () => {
    projectFirestore
      .collection("posts")
      .doc(postId)
      .get()
      .then((result) => {
        let likes = result.data().likes;
        if (likes.includes(username)) {
          likes = likes.filter((x) => x !== username);
          setActive(false);
        } else {
          likes.push(username);
        }
        projectFirestore
          .collection("posts")
          .doc(postId)
          .update({ likes })
          .then(() => {
            if (likes.includes(username)) {
              setActive(true);
              console.log("Liked Successfully!");
            } else {
              console.log("You disliked that post!");
            }
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  const openPostDetails = () => {
    history.push(`/post-comments-details/${postId}`);
  };

  const showOptions = () => setShowModal(true);
  const hideOptions = () => setShowModal(false);

  projectFirestore
    .collection("posts")
    .doc(postId)
    .get()
    .then((res) => {
      if (res.data().likes.includes(username)) {
        setActive(true);
      } else {
        setActive(false);
      }
    });

  return (
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

      <Modal show={showModal} onHide={hideOptions}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Share</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <ListGroup variant="flush">
            <ListGroup.Item action>Share in Direct</ListGroup.Item>
            <ListGroup.Item action>Share in Facebook</ListGroup.Item>
            <ListGroup.Item action>Share in Messenger</ListGroup.Item>
            <ListGroup.Item action>Share in Twitter</ListGroup.Item>
            <ListGroup.Item action>Share with Email</ListGroup.Item>
            <ListGroup.Item action>Copy</ListGroup.Item>
            <ListGroup.Item action onClick={hideOptions}>
              Cancel
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}
