import React, { useState, useEffect, useContext } from "react";
import Comment from "../Comment";
import AddComment from "../AddComment";
import { GlobalStateContext } from "../../context";
import { projectFirestore } from "../../firebase/config";

<<<<<<< HEAD
export default function Comments({ postId, showAddComment = true }) {
=======
const Comments = ({ postId }) => {
>>>>>>> 5e8e555d71d2a7821387c40e550f69edbaf3fe77
  const context = useContext(GlobalStateContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    projectFirestore
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
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
}

export default Comments;
