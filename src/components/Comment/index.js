import React from "react";
import { useHistory } from "react-router-dom";

const Comment = ({ comment }) => {
  const history = useHistory();

  const goToUserProfile = () => {
    history.push(`/profile/${comment.creatorId}`);
  };

  return (
    <p>
      <strong onClick={goToUserProfile} style={{ cursor: "pointer" }}>
        {comment.creatorUsername}
      </strong>{" "}
      {comment.text}
    </p>
  );
};

export default Comment;
