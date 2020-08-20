import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import PostCommentsDetails from "./components/PostCommentsDetails";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/post-comments-details/:id"
          component={PostCommentsDetails}
        />
      </Switch>
    </Router>
  );
};

export default App;
