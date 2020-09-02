import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import Comments from "../Comments";
import PostNavbar from "../PostNavbar";
import PostModal from "../PostModal";
import { projectFirestore } from "../../firebase/config";

export default function Post({ post, userId }) {
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState([]);

  const showOptions = () => setShowModal(true);
  const hideOptions = () => setShowModal(false);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .doc(post.id)
      .onSnapshot((res) => {
        setLikes(res.data().likes);
      });

    return () => unsub();
  }, [post.id]);

  return (
    <>
      <Card className="post mb-5">
        <Card.Header className="card-header">
          <Link to="/profile">
            <Card.Img
              variant="top"
              src={post.post.userImageUrl}
              className="card-header-img"
            />
          </Link>
          <span>{post.post.username}</span>
          <Card.Link href="#properties" onClick={showOptions}>
            <BsThreeDots className="float-right text-dark navbar-header-dots" />
          </Card.Link>
        </Card.Header>
        <Card.Img variant="top" src={post.post.imageUrl} height="600px" />
        <Card.Body>
          <PostNavbar postId={post.id} />
          <Card.Text className="mt-2 mb-2">
            {likes.length === 0 ? (
              <strong>No likes</strong>
            ) : likes.length === 1 ? (
              <strong>{likes.length} like</strong>
            ) : (
              <strong>{likes.length} likes</strong>
            )}
          </Card.Text>
          <Comments postId={post.id} />
        </Card.Body>
      </Card>

      <PostModal
        showModal={showModal}
        hideOptions={hideOptions}
        postId={post.id}
        userId={userId}
      />
    </>
  );
}
