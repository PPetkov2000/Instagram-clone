import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, ListGroup } from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";

const PostModal = ({ showModal, hideOptions, postId, userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [creator, setCreator] = useState("");
  const history = useHistory();

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .doc(postId)
      .onSnapshot((res) => {
        setCreator(res.data().creator);
      });

    return () => unsub();
  }, [postId]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(userId)
      .onSnapshot((snapshot) => {
        const following = snapshot.data().following;

        if (following.includes(creator)) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });

    return () => unsub();
  }, [userId, creator]);

  const followAndUnfollowUser = () => {
    projectFirestore
      .collection("instagramUsers")
      .doc(userId)
      .get()
      .then((res) => {
        let following = res.data().following;

        if (!following.includes(creator)) {
          following.push(creator);
        } else {
          following = following.filter((x) => x !== creator);
        }

        return projectFirestore
          .collection("instagramUsers")
          .doc(userId)
          .update({ following });
      });

    hideOptions();
  };

  const openPost = () => {
    history.push(`/post-comments-details/${postId}`);
  };

  return (
    <Modal show={showModal} onHide={hideOptions}>
      <Modal.Body className="modal-body">
        <ListGroup variant="flush" className="text-center">
          <ListGroup.Item action className="text-danger">
            Report
          </ListGroup.Item>
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
