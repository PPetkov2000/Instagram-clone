import React from "react";

const Suggestion = ({ suggestion }) => {
  return (
    <div className="aside-suggestions-item">
      <a href="#profile">
        <img
          src="/images/user_icon.png"
          alt="user_icon"
          className="aside-suggestions-img"
        />
      </a>
      <div className="aside-suggestions-content">
        <strong>{suggestion.userSuggested}</strong>
        <p className="text-muted" style={{ margin: "0" }}>
          Followed by {suggestion.userFollowers[0]} and{" "}
          {suggestion.userFollowers.length - 1} others
        </p>
      </div>
      <a href="#follow" className="aside-follow-user">
        <strong>Follow</strong>
      </a>
    </div>
  );
};

export default Suggestion;
