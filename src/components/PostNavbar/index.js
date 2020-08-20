import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import {
  BsHeart,
  BsFillHeartFill,
  BsCursor,
  BsChat,
  BsBookmark,
} from "react-icons/bs";
import { projectFirestore } from "../../firebase/config";
import { GlobalStateContext } from "../../context";

export default function PostNavbar({ postId }) {
  const { username } = useContext(GlobalStateContext);
  const [active, setActive] = useState(false);
  const likePost = () => {
    setActive(true);
    projectFirestore
      .collection("posts")
      .doc(postId)
      .get()
      .then((result) => {
        const likes = result.data().likes;
        if (likes.includes(username)) {
          console.log("You have already liked that post!");
          return;
        }
        likes.push(username);
        projectFirestore
          .collection("posts")
          .doc(postId)
          .update({ likes })
          .then(() => {
            console.log("Liked Successfully!");
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  return (
    <>
      <Navbar className="posts-navbar">
        <Nav>
          <Nav.Link href="#like" className="nav-icon" onClick={likePost}>
            {active ? <BsFillHeartFill /> : <BsHeart />}
          </Nav.Link>
        </Nav>
        <Nav>
          <Link to="/post-comments-details/:id" className="nav-icon">
            <BsChat />
          </Link>
        </Nav>
        <Nav>
          <Nav.Link href="#share" className="nav-icon">
            <BsCursor />
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#bookmark" className="nav-icon">
            <BsBookmark />
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}
