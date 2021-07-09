import React from "react";
import { Link } from "react-router-dom";
import Suggestions from "../Suggestions";
import { useAuth } from "../../contexts/authProvider";
import Loader from "../Loader";

const Aside = () => {
  const { authUser } = useAuth();

  return authUser ? (
    <aside className="aside">
      <div className="aside-profile">
        <Link to={`/profile/${authUser.uid}`}>
          <img
            src={authUser.profileImage}
            alt="user_icon"
            className="aside-profile-img"
          />
        </Link>
        <div className="aside-profile-content">
          <strong>{authUser.username}</strong>
          <p className="text-muted" style={{ margin: "0" }}>
            {authUser.fullName}
          </p>
        </div>
      </div>
      <div className="aside-suggestions">
        <div className="aside-suggestions-header">
          <h6 className="text-muted">Suggestions For You</h6>
          <small>
            <strong>See All</strong>
          </small>
        </div>
        <div className="aside-suggestions-body">
          <Suggestions />
        </div>
      </div>
      <div className="aside-footer text-center">
        <p className="text-muted">@Instagram 2020</p>
      </div>
    </aside>
  ) : (
    <Loader />
  );
};

export default Aside;
