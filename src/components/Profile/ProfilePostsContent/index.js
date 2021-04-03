import React, { useState } from "react";
import { BsFillHeartFill, BsFillChatFill } from "react-icons/bs";
import ProfilePostsContentModal from "../ProfilePostsContentModal";

const ProfilePostsContent = ({ posts }) => {
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState();

  const openPost = (id) => {
    setPostId(id);
    setShowModal(true);
  };

  return (
    <div className="profile-posts-img-container">
      {posts.map((post) => {
        return (
          <div key={post.id} className="profile-posts-img-div">
            <img src={post.imageUrl} alt="post" className="profile-posts-img" />
            <div
              className="profile-posts-hover"
              onClick={() => openPost(post.id)}
            >
              <span>
                <BsFillHeartFill /> {post.likes.length}
              </span>
              <span>
                <BsFillChatFill /> {post.comments.length}
              </span>
            </div>
          </div>
        );
      })}
      <ProfilePostsContentModal
        showModal={showModal}
        hideModalHandler={() => setShowModal(false)}
        postId={postId}
      />
    </div>
  );
};

export default ProfilePostsContent;
