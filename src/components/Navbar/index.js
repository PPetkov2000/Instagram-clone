import React, { useState, useEffect, useContext } from "react";
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
import { projectAuth, projectFirestore } from "../../firebase/config";
import { GlobalStateContext } from "../../utils/context";

const NavBar = () => {
  const [notifications, setNotifications] = useState([]);
  const history = useHistory();
  const context = useContext(GlobalStateContext);
  const uid = context && context.uid;

  useEffect(() => {
    if (uid == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setNotifications(snapshot.data().notifications);
      });

    return () => unsub();
  }, [uid]);

  const logoutUser = () => {
    projectAuth
      .signOut()
      .then(() => {
        localStorage.removeItem("userId");
        history.push("/login");
        console.log("You have logged out!");
      })
      .catch(console.error);
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
                    {notifications
                      .sort((a, b) => b.timestamp - a.timestamp)
                      .slice(0, 5)
                      .map((notification) => {
                        return (
                          <NotificationsItem
                            key={notification.timestamp}
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
                  <Link to={`/profile/${context && context.uid}`}>
                    <BsPeopleCircle className="navbar-profile-popover-icon" />
                    Profile
                  </Link>
                  <Link to="/saved">
                    <BsBookmark className="navbar-profile-popover-icon" />
                    Saved
                  </Link>
                  <Link to="/settings">
                    <BsGearWide className="navbar-profile-popover-icon" />
                    Settings
                  </Link>
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
