import React from "react";

export default function Comment({ comment }) {
  return (
    <p>
      <strong>{comment.creator}</strong> {comment.text}
    </p>
  );
}
