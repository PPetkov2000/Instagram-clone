import React from "react";
import ProfilePostsContent from "../ProfilePostsContent";
import ProfilePostsDefaultView from "../ProfilePostsDefaultView";

const ProfilePosts = ({ posts }) => {
  return posts.length === 0 ? (
    <ProfilePostsDefaultView />
  ) : (
    <ProfilePostsContent posts={posts} />
  );
};

export default ProfilePosts;
