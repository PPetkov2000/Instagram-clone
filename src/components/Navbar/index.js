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
import { useAuth } from "../../contexts/authProvider";
import requester from "../../firebase/requester";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [availableContacts, setAvailableContacts] = useState([]);
  const history = useHistory();
  const { authUser, logout } = useAuth();

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
      const users = [];
      availableContacts.forEach((contact) => {
        if (search !== "" && contact.username.startsWith(search)) {
          users.push(contact);
        } else {
          setSearchedResults([]);
        }
      });
      setSearchedResults(users);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, availableContacts]);

  const logoutUser = async () => {
    try {
      await logout();
      localStorage.removeItem("userId");
      history.push("/login");
      console.log("You have logged out!");
    } catch (error) {
      console.log(error);
    }
  };

  return !authUser ? null : (
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
      <Form style={{ position: "relative" }}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className="search-result"
          style={{
            display: searchedResults ? "block" : "none",
            position: "absolute",
            backgroundColor: "#e9eaeb",
            width: "100%",
          }}
        >
          {searchedResults.length > 0 &&
            searchedResults.map((result) => (
              <div key={result.id}>
                <Link to={`/profile/${result.id}`}>{result.username}</Link>
              </div>
            ))}
        </div>
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
                    {authUser &&
                      authUser.notifications &&
                      authUser.notifications
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
        {authUser && (
          <Nav.Link href="#profile" className="navbar__icon">
            <OverlayTrigger
              trigger="click"
              rootClose
              key="bottom"
              placement="bottom"
              overlay={
                <Popover className="navbar__profile-popover">
                  <Popover.Content>
                    <Link to={`/profile/${authUser.uid}`}>
                      <BsPeopleCircle className="navbar__profile-popover-icon" />
                      Profile
                    </Link>
                    <Link to="/saved">
                      <BsBookmark className="navbar__profile-popover-icon" />
                      Saved
                    </Link>
                    <Link to={`/edit/${authUser.uid}`}>
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
                src={authUser.profileImage}
                alt="profile"
                className="navbar__profile-image"
              />
            </OverlayTrigger>
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
