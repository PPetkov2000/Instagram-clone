import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return authUser && authUser.isAdmin ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/forbidden", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default AdminRoute;
