import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import Comments from "../Comments";
import PostNavbar from "../PostNavbar";
import PostModal from "../PostModal";
import { projectFirestore } from "../../firebase/config";

export default function Post({ post, uid }) {
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState([]);
  const [postCreator, setPostCreator] = useState();
  const [currentUserProfileImage, setCurrentUserProfileImage] = useState();
  const [postCreatorProfileImage, setPostCreatorProfileImage] = useState();

  const showOptions = () => setShowModal(true);
  const hideOptions = () => setShowModal(false);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("posts")
      .doc(post.id)
      .onSnapshot((snapshot) => {
        setLikes(snapshot.data().likes);
        setPostCreator(snapshot.data().creator);
      });

    return () => unsub();
  }, [post.id]);

  useEffect(() => {
    if (uid == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setCurrentUserProfileImage(snapshot.data().profileImage);
      });

    return () => unsub();
  }, [uid]);

  useEffect(() => {
    if (postCreator == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(postCreator)
      .onSnapshot((snapshot) => {
        setPostCreatorProfileImage(snapshot.data().profileImage);
      });

    return () => unsub();
  }, [postCreator]);

  return (
    <>
      <Card className="post mb-5">
        <Card.Header className="card-header">
          <Link to={`/profile/${postCreator}`}>
            <Card.Img
              variant="top"
              src={
                uid === postCreator
                  ? currentUserProfileImage
                  : postCreatorProfileImage
              }
              className="card-header-img"
            />
          </Link>
          <span>{post.username}</span>
          <Card.Link href="#properties" onClick={showOptions}>
            <BsThreeDots className="float-right text-dark navbar-header-dots" />
          </Card.Link>
        </Card.Header>
        <Card.Img variant="top" src={post.imageUrl} height="600px" />
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
        userId={uid}
        postCreator={post.creator}
      />
    </>
  );
}
