import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { projectAuth } from "../../firebase/config";
import { generateUserDocument } from "../../firebase/user";

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const { user } = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, {
        fullName,
        username,
        profileImage: "/images/user_icon.png",
        followers: [],
        following: [],
        saved: [],
        tagged: [],
        suggestions: [],
        notifications: [],
      });
      localStorage.setItem("userId", user.uid);
      history.push("/");
      console.log("Registered successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <section className="register-section">
        <h1>Instagram</h1>
        <h5 className="text-muted mt-3 mb-4">
          Sign up to see photos and videos from your friends.
        </h5>
        <Form onSubmit={registerUser}>
          <Form.Group controlId="formGroupEmail">
            <Form.Control
              type="email"
              className="register-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group controlId="formGroupFullName">
            <Form.Control
              type="text"
              className="register-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />
          </Form.Group>
          <Form.Group controlId="formGroupUsername">
            <Form.Control
              type="text"
              className="register-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Control
              type="password"
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            block
            disabled={!email || !username || !password || !fullName}
          >
            Next
          </Button>
          <p className="text-muted small mt-4">
            By signing up, you agree to our Terms. Learn how we collect, use and
            share your data in our Data Policy and how we use cookies and
            similar technology in our Cookies Policy.
          </p>
        </Form>
      </section>
      <section className="registered-section">
        <p className="mt-2">
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
