import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { BsCursor, BsHeart, BsCompass } from "react-icons/bs";

export default function NavBar() {
  return (
    <Navbar bg="light" variant="light" className="navbar">
      <Navbar.Brand href="#home">
        <img
          src="/images/instagram_logo.png"
          className="d-inline-block align-top"
          alt="logo"
        />
      </Navbar.Brand>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
      <Nav>
        <Nav.Link href="#home" active className="nav-icon">
          <AiFillHome />
        </Nav.Link>
        <Nav.Link href="#messages" className="nav-icon">
          <BsCursor />
        </Nav.Link>
        <Nav.Link href="#features" className="nav-icon">
          <BsCompass />
        </Nav.Link>
        <Nav.Link href="#notifications" className="nav-icon">
          <BsHeart />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
