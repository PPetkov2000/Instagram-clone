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

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/messages" component={Messages} />
        <Route
          path="/post-comments-details/:id"
          component={PostCommentsDetails}
        />
        <Route path="/profile" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
