import React from "react";
import ProfilePostsContent from "../ProfilePostsContent";
import ProfilePostsEmpty from "../ProfilePostsEmpty";

const ProfileSaved = ({ savedPosts }) => {
  return savedPosts.length === 0 ? (
    <ProfilePostsEmpty />
  ) : (
    <ProfilePostsContent posts={savedPosts} />
  );
};

export default ProfileSaved;
