import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import PostCommentsDetails from "./components/PostCommentsDetails";
import Navbar from "./components/Navbar";
import Messages from "./components/Messages";
import Profile from "./components/Profile";

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
      </Switch>
    </Router>
  );
};

export default App;
