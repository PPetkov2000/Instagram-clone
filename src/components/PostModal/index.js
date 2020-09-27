import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, ListGroup } from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";
import requester from "../../firebase/requester";

const PostModal = ({ showModal, hideOptions, postId, userId, postCreator }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(userId)
      .onSnapshot((snapshot) => {
        setIsFollowing(snapshot.data().following.includes(postCreator));
      });

    return () => unsub();
  }, [userId, postCreator]);

  const followAndUnfollowUser = () => {
    Promise.all([
      requester.get("instagramUsers", userId),
      requester.get("instagramUsers", postCreator),
    ])
      .then(([currentUser, postCreatorUser]) => {
        let currentUserFollowing = currentUser.data().following;
        let postCreatorUserFollowers = postCreatorUser.data().followers;
        let postCreatorUserNotifications = postCreatorUser.data().notifications;

        if (!currentUserFollowing.includes(postCreator)) {
          currentUserFollowing.push(postCreator);
          postCreatorUserFollowers.push(userId);
          postCreatorUserNotifications.push({
            id: currentUser.id,
            username: currentUser.data().username,
            profileImage: currentUser.data().profileImage,
            timestamp: new Date(),
            type: "follower",
          });
        } else {
          currentUserFollowing = currentUserFollowing.filter(
            (x) => x !== postCreator
          );
          postCreatorUserFollowers = postCreatorUserFollowers.filter(
            (x) => x !== userId
          );
          postCreatorUserNotifications = postCreatorUserNotifications.filter(
            (x) => x.id !== userId
          );
        }

        return Promise.all([
          requester.update("instagramUsers", userId, {
            following: currentUserFollowing,
          }),
          requester.update("instagramUsers", postCreator, {
            followers: postCreatorUserFollowers,
            notifications: postCreatorUserNotifications,
          }),
        ]);
      })
      .catch(console.error);

    hideOptions();
  };

  const openPost = () => {
    history.push(`/post-comments-details/${postId}`);
  };

  return (
    <Modal show={showModal} onHide={hideOptions} centered>
      <Modal.Body className="modal-body">
        <ListGroup variant="flush" className="text-center">
          <ListGroup.Item action className="text-danger">
            Report
          </ListGroup.Item>
          {userId !== postCreator && (
            <>
              {isFollowing ? (
                <ListGroup.Item
                  action
                  className="text-danger"
                  onClick={followAndUnfollowUser}
                >
                  Cancel subscription
                </ListGroup.Item>
              ) : (
                <ListGroup.Item
                  action
                  className="text-success"
                  onClick={followAndUnfollowUser}
                >
                  Subscribe
                </ListGroup.Item>
              )}
            </>
          )}
          <ListGroup.Item action onClick={openPost}>
            Go to post
          </ListGroup.Item>
          <ListGroup.Item action>Share</ListGroup.Item>
          <ListGroup.Item action>Copy</ListGroup.Item>
          <ListGroup.Item action>Embed</ListGroup.Item>
          <ListGroup.Item action onClick={hideOptions}>
            Cancel
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
