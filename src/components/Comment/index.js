import React from "react";

const Comment = ({ comment }) => {
  return (
    <p>
      <strong>{comment.creator}</strong> {comment.text}
    </p>
  );
}

export default Comment;
