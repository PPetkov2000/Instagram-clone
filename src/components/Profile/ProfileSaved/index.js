import React, { useState } from "react";
import { BsFillHeartFill, BsFillChatFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import PostCommentsDetails from "../../../screens/PostCommentsDetails";

const ProfileSaved = ({ savedPosts }) => {
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState();

  const openPost = (e) => {
    setPostId(e.target.dataset.id);
    setShowModal(true);
  };

  return (
    <div className="profile-saved-img-container">
      {savedPosts.length === 0 ? (
        <h3>No posts</h3>
      ) : (
        <>
          {savedPosts.map((post) => {
            return (
              <div key={post.postId} className="profile-saved-img-div">
                <img
                  src={post.imageUrl}
                  alt="saved post"
                  className="profile-saved-img"
                />
                <div
                  className="profile-saved-hover"
                  data-id={post.postId}
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
            className="profile-saved-modal"
          >
            <Modal.Body className="profile-saved-modal-body">
              <PostCommentsDetails postId={postId} />
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ProfileSaved;
