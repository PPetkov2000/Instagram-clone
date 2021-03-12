import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useGlobalContext } from "../../utils/context";
import { projectFirestore } from "../../firebase/config";
import requester from "../../firebase/requester";
import ProfileHeaderUserStatusModal from "../Profile/ProfileHeaderUserStatusModal";

function CommentLikesModal({ showModal, hideModal, likes }) {
  const [likedCommentUsers, setLikedCommentUsers] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [showUserStatusModal, setShowUserStatusModal] = useState(false);
  const [clickedUserId, setClickedUserId] = useState();
  const [clickedUser, setClickedUser] = useState();
  const history = useHistory();
  const context = useGlobalContext();
  const uid = context && context.uid;

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
    if (uid == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setCurrentUserFollowing(snapshot.data().following);
      });

    return () => unsub();
  }, [uid]);

  useEffect(() => {
    if (clickedUserId == null) return;

    requester
      .get("instagramUsers", clickedUserId)
      .then((res) => {
        setClickedUser({ id: res.id, ...res.data() });
      })
      .catch(console.error);
  }, [clickedUserId]);

  const goToUserProfile = (e) => {
    history.push(`/profile/${e.target.dataset.userId}`);
  };

  const followUser = (e) => {
    if (uid == null) return;

    const userId = e.target.dataset.userId;

    Promise.all([
      requester.get("instagramUsers", uid),
      requester.get("instagramUsers", userId),
    ])
      .then(([currentUser, followedUser]) => {
        const currentUserFollowing = currentUser.data().following;
        const followedUserFollowers = followedUser.data().followers;
        const followedUserNotifications = followedUser.data().notifications;

        currentUserFollowing.push(userId);
        followedUserFollowers.push(uid);
        followedUserNotifications.push({
          id: currentUser.id,
          username: currentUser.data().username,
          profileImage: currentUser.data().profileImage,
          timestamp: new Date(),
          type: "follower",
        });

        return Promise.all([
          requester.update("instagramUsers", uid, {
            following: currentUserFollowing,
          }),
          requester.update("instagramUsers", userId, {
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
                  data-user-id={user.id}
                  onClick={goToUserProfile}
                />
                <div className="comment-likes-modal-body-text">
                  <strong data-user-id={user.id} onClick={goToUserProfile}>
                    {user.username}
                  </strong>
                  <p className="text-muted">{user.fullName}</p>
                </div>
                {uid !== user.id && (
                  <>
                    {currentUserFollowing.includes(user.id) ? (
                      <button
                        className="comment-likes-following-button"
                        data-user-id={user.id}
                        onClick={(e) => {
                          setClickedUserId(e.target.dataset.userId);
                          setShowUserStatusModal(true);
                        }}
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        className="comment-likes-follow-button"
                        data-user-id={user.id}
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
        userId={clickedUserId}
        uid={uid}
        userProfileImage={clickedUser && clickedUser.profileImage}
        username={clickedUser && clickedUser.username}
      />
    </>
  );
}

export default CommentLikesModal;
