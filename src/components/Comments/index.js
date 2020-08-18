import React, { useState, useContext } from "react";
import Comment from "../Comment";
import AddComment from "../AddComment";
import { GlobalStateContext } from "../../context";

export default function Comments() {
  const context = useContext(GlobalStateContext);
  const [comments, setComments] = useState(context.comments);

  return (
    <>
      <div className="comments-container">
        {comments.map((comment) => {
          return <Comment key={comment.creatorId} comment={comment} />;
        })}
        <p className="text-muted">2 hours ago</p>
      </div>
      <AddComment comments={comments} setComments={setComments} />
    </>
  );
}
