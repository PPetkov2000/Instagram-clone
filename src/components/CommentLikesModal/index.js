import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useGlobalContext } from "../../utils/context";
import { projectFirestore } from "../../firebase/config";
import requester from "../../firebase/requester";
import ProfileHeaderUserStatusModal from "../Profile/ProfileHeaderUserStatusModal";

function CommentLikesModal({ showModal, hideModal, likes }) {
  const [likedCommentUsers, setLikedCommentUsers] = useState([]);
  const [showUserStatusModal, setShowUserStatusModal] = useState(false);
  const [clickedUserId, setClickedUserId] = useState();
  const [clickedUser, setClickedUser] = useState();
  const history = useHistory();
  const authUser = useGlobalContext();
  const [authUserFollowing, setAuthUserFollowing] = useState([]);

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

  const followUser = () => {
    Promise.all([
      requester.get("instagramUsers", authUser.uid),
      requester.get("instagramUsers", clickedUserId),
    ])
      .then(([currentUser, followedUser]) => {
        const currentUserFollowing = currentUser.data().following;
        const followedUserFollowers = followedUser.data().followers;
        const followedUserNotifications = followedUser.data().notifications;

        currentUserFollowing.push(clickedUserId);
        followedUserFollowers.push(authUser.uid);
        followedUserNotifications.push({
          id: currentUser.id,
          username: currentUser.data().username,
          profileImage: currentUser.data().profileImage,
          timestamp: new Date(),
          type: "follower",
        });

        return Promise.all([
          requester.update("instagramUsers", authUser.uid, {
            following: currentUserFollowing,
          }),
          requester.update("instagramUsers", clickedUserId, {
            followers: followedUserFollowers,
            notifications: followedUserNotifications,
          }),
        ]);
      })
      .catch(console.error);
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
                        onClick={followUser}
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
