import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import PostCommentsDetails from "./components/PostCommentsDetails";
import Navbar from "./components/Navbar";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import Context from "./context";

const App = () => {
  const userId = localStorage.getItem("userId");

  return (
    <Context>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/messages" component={Messages} />
          <Route
            path="/post-comments-details/:id"
            component={PostCommentsDetails}
          />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </Context>
  );
};

export default App;
