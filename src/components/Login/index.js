import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { projectAuth } from "../../firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginUser = (e) => {
    e.preventDefault();
    projectAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Logged in successfully!");
        history.push("/");
      })
      .catch(console.error);
  };

  return (
    <div className="login-container">
      <section className="login-section">
        <h1 className="mb-5">Instagram</h1>
        <Form onSubmit={loginUser}>
          <Form.Group controlId="formGroupEmail">
            <Form.Control
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Control
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            className="mb-3"
            block
            disabled={!email || !password}
          >
            Login
          </Button>
          <Link to="#forgotpassword" className="small">
            Forgot Password?
          </Link>
        </Form>
      </section>
      <section className="loggedIn-section">
        <p className="mt-2">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
