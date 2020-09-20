import React, { useState } from "react";
import { BsFillHeartFill, BsFillChatFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import PostCommentsDetails from "../PostCommentsDetails";

const ProfilePosts = ({ posts }) => {
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState();
  console.log(posts);

  const openPost = (e) => {
    setPostId(e.target.dataset.id);
    setShowModal(true);
  };

  return posts.length === 0 ? (
    <>
      <img src="/images/profile_image.jpg" alt="profile" />
      <div className="user-profile-activities-content">
        <h5>Start capturing and sharing your moments.</h5>
        <p>Get the app to share your first photo or video.</p>
        <div className="user-profile-buttons">
          <a href="#icon" alt="icon">
            <img src="/images/app_store_icon.png" alt="app-store" />
          </a>
          <a href="#icon" alt="icon">
            <img src="/images/google_play_icon.png" alt="google-play" />
          </a>
        </div>
      </div>
    </>
  ) : (
    <div className="profile-posts-img-container">
      {posts.map((post) => {
        return (
          <div key={post.id} className="profile-posts-img-div">
            <img src={post.imageUrl} alt="post" className="profile-posts-img" />
            <div
              className="profile-posts-hover"
              data-id={post.id}
              onClick={openPost}
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

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="profile-posts-modal"
      >
        <Modal.Body className="profile-posts-modal-body">
          <PostCommentsDetails postId={postId} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfilePosts;
