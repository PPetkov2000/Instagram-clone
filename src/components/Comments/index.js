import React, { useState, useEffect, useContext } from "react";
import Comment from "../Comment";
import AddComment from "../AddComment";
import { GlobalStateContext } from "../../context";
import { projectFirestore } from "../../firebase/config";

const Comments = ({ postId, showAddComment = true }) => {
  const context = useContext(GlobalStateContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });

    return () => unsub();
  }, [postId]);

  return (
    <>
      <div className="comments-container">
        {comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
        {showAddComment && <p className="text-muted">2 hours ago</p>}
      </div>
      {showAddComment && (
        <AddComment postId={postId} username={context.username} />
      )}
    </>
  );
};

export default Comments;
