import React, { useState, useEffect } from "react";
import Post from "../Post";
import { projectFirestore } from "../../firebase/config";

const Posts = ({ uid }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

    return () => unsub();
  }, []);

  return (
    <div className="posts-container">
      {posts.map((post) => {
        return <Post key={post.id} post={post} uid={uid} />;
      })}
    </div>
  );
};

export default Posts;
