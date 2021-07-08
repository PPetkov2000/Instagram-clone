import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import AuthProvider from "./utils/authProvider";
import PrivateRoute from "./router/PrivateRoute"
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import PostCommentsDetails from "./screens/PostCommentsDetails";
import Messages from "./screens/Messages";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Login from "./screens/Login";
import ProfileSettings from "./screens/ProfileSettings";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/messages" component={Messages} />
          <PrivateRoute path="/post-comments-details/:id" component={PostCommentsDetails} />
          <PrivateRoute path="/profile/:id" component={Profile} />
          <PrivateRoute path="/edit/:id" component={ProfileSettings} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
