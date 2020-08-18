import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BsHeart, BsCursor, BsChat, BsBookmark } from "react-icons/bs";

export default function PostNavbar() {
  return (
    <Navbar className="posts-navbar">
      <Nav>
        <Nav.Link href="#like" className="nav-icon">
          <BsHeart />
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="#details" className="nav-icon">
          <BsChat />
        </Nav.Link>
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
  );
}
