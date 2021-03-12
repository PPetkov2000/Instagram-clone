import React, { useState, useEffect } from "react";
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
import { useGlobalContext } from "../../utils/context";
import requester from "../../firebase/requester";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState();
  const [search, setSearch] = useState("");
  const [searchedResults, setSearchedResults] = useState();
  const [availableContacts, setAvailableContacts] = useState([]);
  const history = useHistory();
  const context = useGlobalContext();
  const uid = context && context.uid;

  useEffect(() => {
    if (uid == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setCurrentUser({ id: snapshot.id, ...snapshot.data() });
      });

    return () => unsub();
  }, [uid]);

  useEffect(() => {
    requester
      .getAll("instagramUsers")
      .then((res) => {
        const users = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAvailableContacts(users);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      availableContacts.forEach((contact) => {
        if (search !== "" && contact.username.includes(search)) {
          console.log(`Match: ${contact.username} => ${search}`);
        }
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, availableContacts]);

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

  return !uid ? null : (
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
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      <Nav>
        <Nav.Link
          href="/"
          className="navbar__icon"
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
          }}
        >
          <AiFillHome />
        </Nav.Link>
        <Nav.Link
          href="/messages"
          className="navbar__icon"
          onClick={(e) => {
            e.preventDefault();
            history.push("/messages");
          }}
        >
          <BsCursor />
        </Nav.Link>
        <Nav.Link href="#features" className="navbar__icon">
          <BsCompass />
        </Nav.Link>
        <Nav.Link href="#notifications" className="navbar__icon">
          <OverlayTrigger
            trigger="click"
            rootClose
            key="bottom"
            placement="bottom"
            overlay={
              <Popover>
                <Popover.Content>
                  <ListGroup variant="flush">
                    {currentUser &&
                      currentUser.notifications
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
        <Nav.Link href="#profile" className="navbar__icon">
          <OverlayTrigger
            trigger="click"
            rootClose
            key="bottom"
            placement="bottom"
            overlay={
              <Popover className="navbar__profile-popover">
                <Popover.Content>
                  <Link to={`/profile/${context && context.uid}`}>
                    <BsPeopleCircle className="navbar__profile-popover-icon" />
                    Profile
                  </Link>
                  <Link to="/saved">
                    <BsBookmark className="navbar__profile-popover-icon" />
                    Saved
                  </Link>
                  <Link to={`/edit/${context && context.uid}`}>
                    <BsGearWide className="navbar__profile-popover-icon" />
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
              src={currentUser && currentUser.profileImage}
              alt="profile"
              className="navbar__profile-image"
            />
          </OverlayTrigger>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
