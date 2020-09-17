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
  const [comments, setComments] = useState(0);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .where("creator", "==", userId)
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
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
        projectFirestore
          .collection("posts")
          .doc(postId)
          .onSnapshot((snapshot) => {
            result.push({ id: snapshot.id, ...snapshot.data() });
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
