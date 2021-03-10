import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Home from "./screens/Home";
import PostCommentsDetails from "./screens/PostCommentsDetails";
import Navbar from "./components/Navbar";
import Messages from "./screens/Messages";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Login from "./screens/Login";
import ProfileSettings from "./screens/ProfileSettings";
import Context from "./utils/context";

const App = () => {
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
          <Route path="/edit/:id" component={ProfileSettings} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </Context>
  );
};

export default App;
