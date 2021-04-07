import React, { useState, useEffect } from "react";
import ProfilePosts from "../ProfilePosts";
import ProfileChannel from "../ProfileChannel";
import ProfileSaved from "../ProfileSaved";
import ProfileTagged from "../ProfileTagged";
import { projectFirestore } from "../../../firebase/config";
import requester from "../../../firebase/requester";

const ProfileActivities = ({
  openPosts,
  openChannel,
  openSaved,
  openTagged,
  currentUser,
  currentUserPosts,
}) => {
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [taggedPosts, setTaggedPosts] = useState([]);

  useEffect(() => {
    currentUserPosts.forEach((post) => {
      projectFirestore
        .collection(`posts/${post.id}/comments`)
        .onSnapshot((snapshot) => {
          const comments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts((prevPosts) => {
            return [...prevPosts, { ...post, comments }];
          });
        });
    });
  }, [currentUserPosts]);

  useEffect(() => {
    if (!currentUser.saved) return;

    setSavedPosts(
      currentUser.saved.reduce((result, postId) => {
        Promise.all([
          requester.get("posts", postId),
          requester.getAll(`posts/${postId}/comments`),
        ])
          .then(([postInfo, commentsInfo]) => {
            const post = { id: postInfo.id, ...postInfo.data() };
            const comments = commentsInfo.docs.map((doc) => ({
              commentId: doc.id,
              ...doc.data(),
            }));
            const data = { ...post, comments };
            result.push(data);
          })
          .catch(console.error);

        return result;
      }, [])
    );
  }, [currentUser]);

  return (
    <div className="user-profile-activities">
      {openPosts && <ProfilePosts posts={posts} />}
      {openChannel && <ProfileChannel />}
      {openSaved && <ProfileSaved savedPosts={savedPosts} />}
      {openTagged && <ProfileTagged taggedPosts={taggedPosts} />}
    </div>
  );
};

export default ProfileActivities;
