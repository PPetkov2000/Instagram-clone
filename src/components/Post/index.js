import React from "react";
import { Card } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import Comments from "../Comments";
import PostNavbar from "../PostNavbar";

export default function Post({ post }) {
  return (
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
        <Card.Link href="#properties">
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
  );
}
