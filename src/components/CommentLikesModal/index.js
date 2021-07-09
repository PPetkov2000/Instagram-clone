import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/authProvider";
import { projectFirestore } from "../../firebase/config";
import requester from "../../firebase/requester";
import ProfileHeaderUserStatusModal from "../Profile/ProfileHeaderUserStatusModal";
import { followUser } from "../../utils/userActions";

function CommentLikesModal({ showModal, hideModal, likes }) {
  const [likedCommentUsers, setLikedCommentUsers] = useState([]);
  const [showUserStatusModal, setShowUserStatusModal] = useState(false);
  const [clickedUserId, setClickedUserId] = useState();
  const [clickedUser, setClickedUser] = useState();
  const [authUserFollowing, setAuthUserFollowing] = useState([]);
  const history = useHistory();
  const { authUser } = useAuth();

  useEffect(() => {
    projectFirestore
      .collection("instagramUsers")
      .doc(authUser.uid)
      .onSnapshot((snapshot) => {
        setAuthUserFollowing(snapshot.data().following);
      });
  }, [authUser]);

  useEffect(() => {
    likes.forEach((id) => {
      requester
        .get("instagramUsers", id)
        .then((res) => {
          setLikedCommentUsers((prevLikes) => {
            return [...prevLikes, { id: res.id, ...res.data() }];
          });
        })
        .catch(console.error);
    });
  }, [likes]);

  useEffect(() => {
    if (clickedUserId == null) return;

    requester
      .get("instagramUsers", clickedUserId)
      .then((res) => {
        setClickedUser({ id: res.id, ...res.data() });
      })
      .catch(console.error);
  }, [clickedUserId]);

  const goToUserProfile = () => {
    history.push(`/profile/${clickedUserId}`);
  };

  return (
    <>
      <Modal show={showModal} onHide={hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Likes</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {likedCommentUsers.map((user) => {
            return (
              <div key={user.id} className="comment-likes-modal-body-container">
                <img
                  src={user.profileImage}
                  alt="user"
                  className="comment-likes-img"
                  onClick={goToUserProfile}
                />
                <div className="comment-likes-modal-body-text">
                  <strong onClick={goToUserProfile}>{user.username}</strong>
                  <p className="text-muted">{user.fullName}</p>
                </div>
                {authUser.uid !== user.id && (
                  <>
                    {authUserFollowing.includes(user.id) ? (
                      <button
                        className="comment-likes-following-button"
                        onClick={() => {
                          setClickedUserId(user.id);
                          setShowUserStatusModal(true);
                        }}
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        className="comment-likes-follow-button"
                        onClick={() => followUser(authUser, user.id)}
                      >
                        Follow
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </Modal.Body>
      </Modal>

      <ProfileHeaderUserStatusModal
        showModal={showUserStatusModal}
        hideModal={() => setShowUserStatusModal(false)}
        clickedUser={clickedUser}
      />
    </>
  );
}

export default CommentLikesModal;
