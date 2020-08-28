import React from "react";
import { Link } from "react-router-dom";
import Suggestions from "../Suggestions";

const Aside = () => {
  return (
    <aside className="aside">
      <div className="aside-profile">
        <Link to="/profile">
          <img
            src="/images/user_icon.png"
            alt="user_icon"
            className="aside-profile-img"
          />
        </Link>
        <div className="aside-profile-content">
          <strong>my_profile</strong>
          <p className="text-muted" style={{ margin: "0" }}>
            My profile
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
  );
};

export default Aside;
