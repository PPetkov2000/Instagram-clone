import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, ListGroup } from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";
import { useGlobalContext } from "../../utils/context";
import { followAndUnfollowUser } from "../../utils/userActions";

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
                  onClick={() => {
                    followAndUnfollowUser(authUser, postCreator);
                    hideOptions();
                  }}
                >
                  Cancel subscription
                </ListGroup.Item>
              ) : (
                <ListGroup.Item
                  action
                  className="text-success"
                  onClick={() => {
                    followAndUnfollowUser(authUser, postCreator);
                    hideOptions();
                  }}
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
