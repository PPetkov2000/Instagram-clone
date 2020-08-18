import React, { useState, useEffect } from "react";
import Post from "../Post";
import { projectFirestore } from "../../firebase/config";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });

    return () => unsub();
  }, []);

  return (
    <div className="posts-container">
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}
