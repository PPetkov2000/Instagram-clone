import React, { useState, useEffect } from "react";
import ProfilePosts from "../ProfilePosts";
import ProfileChannel from "../ProfileChannel";
import ProfileSaved from "../ProfileSaved";
import ProfileTagged from "../ProfileTagged";
import { projectFirestore } from "../../firebase/config";

const ProfileActivities = ({
  openPosts,
  openChannel,
  openSaved,
  openTagged,
  userId,
}) => {
  const [posts, setPosts] = useState([]);
  const [saved, setSaved] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .where("creator", "==", userId)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          projectFirestore
            .collection(`posts/${doc.id}/comments`)
            .onSnapshot((snap) => {
              const comments = snap.docs.map((doc) => doc.data());

              setPosts(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                  comments: comments.filter(
                    (comment) => comment.postId === doc.id
                  ),
                }))
              );
            });
        });
      });

    return () => unsub();
  }, [userId]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(userId)
      .onSnapshot((snapshot) => {
        if (snapshot.data()) {
          setSaved(snapshot.data().saved);
        }
      });

    return () => unsub();
  }, [userId]);

  useEffect(() => {
    setSavedPosts(
      saved.reduce((result, postId) => {
        Promise.all([
          projectFirestore.collection("posts").doc(postId).get(),
          projectFirestore
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .get(),
        ]).then(([postInfo, commentsInfo]) => {
          const post = { postId: postInfo.id, ...postInfo.data() };
          const comments = commentsInfo.docs.map((doc) => ({
            commentId: doc.id,
            ...doc.data(),
          }));

          const data = { ...post, comments };

          result.push(data);
        });

        return result;
      }, [])
    );
  }, [saved]);

  return (
    <div className="user-profile-activities">
      {openPosts && <ProfilePosts posts={posts} />}
      {openChannel && <ProfileChannel />}
      {openSaved && <ProfileSaved savedPosts={savedPosts} />}
      {openTagged && <ProfileTagged userId={userId} />}
    </div>
  );
};

export default ProfileActivities;
