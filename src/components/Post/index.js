import React, { useState } from "react";
import { Card, Modal, ListGroup } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import Comments from "../Comments";
import PostNavbar from "../PostNavbar";

export default function Post({ post }) {
  const [showModal, setShowModal] = useState(false);

  const showOptions = () => setShowModal(true);
  const hideOptions = () => setShowModal(false);

  return (
    <>
      <Card className="post mb-5">
        <Card.Header className="card-header">
          <Card.Link href="#profile">
            <Card.Img
              variant="top"
              src={post.post.userImageUrl}
              className="card-header-img"
            />
          </Card.Link>
          <span>{post.post.username}</span>
          <Card.Link href="#properties" onClick={showOptions}>
            <BsThreeDots className="float-right text-dark navbar-header-dots" />
          </Card.Link>
        </Card.Header>
        <Card.Img variant="top" src={post.post.imageUrl} height="600px" />
        <Card.Body>
          <PostNavbar postId={post.id} />
          <Card.Text className="mt-2 mb-2">
            Liked from <strong>random_user</strong> and{" "}
            <strong>1,000 others</strong>
          </Card.Text>
          <Comments postId={post.id} />
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={hideOptions}>
        <Modal.Body className="modal-body">
          <ListGroup variant="flush" className="text-center">
            <ListGroup.Item action className="text-danger">
              Report
            </ListGroup.Item>
            <ListGroup.Item action className="text-danger">
              Cancel subscription
            </ListGroup.Item>
            <ListGroup.Item action>To publication</ListGroup.Item>
            <ListGroup.Item action>Share</ListGroup.Item>
            <ListGroup.Item action>Copy</ListGroup.Item>
            <ListGroup.Item action>Embed</ListGroup.Item>
            <ListGroup.Item action onClick={hideOptions}>
              Cancel
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}
