import React from "react";
import ProfilePostsContent from "../ProfilePostsContent";
import ProfilePostsEmpty from "../ProfilePostsEmpty";

const ProfileTagged = ({ taggedPosts }) => {
  return taggedPosts.length === 0 ? (
    <ProfilePostsEmpty />
  ) : (
    <ProfilePostsContent posts={taggedPosts} />
  );
};

export default ProfileTagged;
