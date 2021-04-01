import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, ListGroup } from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";
import requester from "../../firebase/requester";
import { useGlobalContext } from "../../utils/context";

const PostModal = ({ showModal, hideOptions, postId, postCreator }) => {
  const [isCurrentUserFollowing, setIsCurrentUserFollowing] = useState(false);
  const history = useHistory();
  const authUser = useGlobalContext();

  useEffect(() => {
    projectFirestore
      .collection("instagramUsers")
      .doc(authUser.uid)
      .onSnapshot((snapshot) => {
        setIsCurrentUserFollowing(
          snapshot.data().following.includes(postCreator)
        );
      });
  }, [authUser, postCreator]);

  const followAndUnfollowUser = () => {
    Promise.all([
      requester.get("instagramUsers", authUser.uid),
      requester.get("instagramUsers", postCreator),
    ])
      .then(([currentUser, postCreatorUser]) => {
        let currentUserFollowing = currentUser.data().following;
        let postCreatorUserFollowers = postCreatorUser.data().followers;
        let postCreatorUserNotifications = postCreatorUser.data().notifications;

        if (!currentUserFollowing.includes(postCreator)) {
          currentUserFollowing.push(postCreator);
          postCreatorUserFollowers.push(authUser.uid);
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
            (x) => x !== authUser.uid
          );
          postCreatorUserNotifications = postCreatorUserNotifications.filter(
            (x) => x.id !== authUser.uid
          );
        }

        return Promise.all([
          requester.update("instagramUsers", authUser.uid, {
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
          {authUser.uid !== postCreator && (
            <>
              {isCurrentUserFollowing ? (
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
