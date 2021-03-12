import React, { useState, useEffect } from "react";
import Comment from "../Comment";
import AddComment from "../AddComment";
import { projectFirestore } from "../../firebase/config";
import formatTimestamp from "../../utils/formatTimestamp";

const Comments = ({ showAddComment = true, post, showAllComments = false }) => {
  const [comments, setComments] = useState([]);
  const postId = post && post.id;

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
      <div className="comments">
        {comments.length === 0
          ? "No comments yet!"
          : showAllComments
          ? comments.map((comment) => {
              return <Comment key={comment.id} comment={comment} post={post} />;
            })
          : comments.slice(0, 2).map((comment) => {
              return <Comment key={comment.id} comment={comment} post={post} />;
            })}
        {showAddComment && (
          <p className="comments__text">{formatTimestamp(post.timestamp)}</p>
        )}
      </div>
      {showAddComment && <AddComment post={post} />}
    </>
  );
};

export default Comments;
