import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  OverlayTrigger,
  Popover,
  ListGroup,
} from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import {
  BsCursor,
  BsHeart,
  BsCompass,
  BsPeopleCircle,
  BsBookmark,
  BsGearWide,
} from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import NotificationsItem from "../NotificationsItem";
import { projectAuth } from "../../firebase/config";

const NavBar = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, user: "random_user", userImageUrl: "/images/user_icon.png" },
    { id: 2, user: "some_user", userImageUrl: "/images/user_icon.png" },
    { id: 3, user: "new_guy", userImageUrl: "/images/user_icon.png" },
  ]);
  const history = useHistory();

  const logoutUser = () => {
    projectAuth.signOut();
    history.push("/login");
  };

  return (
    <Navbar bg="light" variant="light" className="navbar">
      <Navbar.Brand>
        <Link to="/">
          <img
            src="/images/instagram_logo.png"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Link>
      </Navbar.Brand>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
      <Nav>
        <Nav.Link
          href="/"
          className="nav-icon"
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
          }}
        >
          <AiFillHome />
        </Nav.Link>
        <Nav.Link
          href="/messages"
          className="nav-icon"
          onClick={(e) => {
            e.preventDefault();
            history.push("/messages");
          }}
        >
          <BsCursor />
        </Nav.Link>
        <Nav.Link href="#features" className="nav-icon">
          <BsCompass />
        </Nav.Link>
        <Nav.Link href="#notifications" className="nav-icon">
          <OverlayTrigger
            trigger="click"
            key="bottom"
            placement="bottom"
            overlay={
              <Popover>
                <Popover.Content>
                  <ListGroup variant="flush">
                    {notifications.map((notification) => {
                      return (
                        <NotificationsItem
                          key={notification.id}
                          notification={notification}
                        />
                      );
                    })}
                  </ListGroup>
                </Popover.Content>
              </Popover>
            }
          >
            <BsHeart />
          </OverlayTrigger>
        </Nav.Link>
        <Nav.Link href="#profile" className="nav-icon">
          <OverlayTrigger
            trigger="click"
            key="bottom"
            placement="bottom"
            overlay={
              <Popover className="navbar-profile-popover">
                <Popover.Content>
                  <p>
                    <BsPeopleCircle className="navbar-profile-popover-icon" />
                    <Link to="/profile" className="text-dark">
                      Profile
                    </Link>
                  </p>
                  <p>
                    <BsBookmark className="navbar-profile-popover-icon" />
                    <Link to="/saved" className="text-dark">
                      Saved
                    </Link>
                  </p>
                  <p>
                    <BsGearWide className="navbar-profile-popover-icon" />
                    <Link to="/settings" className="text-dark">
                      Settings
                    </Link>
                  </p>
                  <p style={{ cursor: "pointer" }} onClick={logoutUser}>
                    Logout
                  </p>
                </Popover.Content>
              </Popover>
            }
          >
            <img
              src="/images/user_icon.png"
              alt="profile"
              className="navbar-profile-img"
            />
          </OverlayTrigger>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
