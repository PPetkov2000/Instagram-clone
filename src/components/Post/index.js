import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import Comments from "../Comments";
import PostNavbar from "../PostNavbar";
import PostModal from "../PostModal";
import { projectFirestore } from "../../firebase/config";
import CommentLikesModal from "../CommentLikesModal";
import { useGlobalContext } from "../../utils/context";

export default function Post({ post, uid }) {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showCommentLikesModal, setShowCommentLikesModal] = useState(false);
  const [postCreatorProfileImage, setPostCreatorProfileImage] = useState();
  const authUser = useGlobalContext();

  const showOptions = () => setShowOptionsModal(true);
  const hideOptions = () => setShowOptionsModal(false);
  const showCommentLikes = () => setShowCommentLikesModal(true);
  const hideCommentLikes = () => setShowCommentLikesModal(false);

  useEffect(() => {
    if (post.creator == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(post.creator)
      .onSnapshot((snapshot) => {
        setPostCreatorProfileImage(snapshot.data().profileImage);
      });

    return () => unsub();
  }, [post.creator]);

  return (
    <>
      <Card className="post mb-5">
        <Card.Header className="post__header">
          <Link to={`/profile/${post.creator}`}>
            <Card.Img
              variant="top"
              src={
                authUser.uid === post.creator
                  ? authUser.profileImage
                  : postCreatorProfileImage
              }
              className="post__header-image"
            />
          </Link>
          <span>{post.username}</span>
          <Card.Link href="#properties" onClick={showOptions}>
            <BsThreeDots className="float-right text-dark post__options-icon" />
          </Card.Link>
        </Card.Header>
        <Card.Img variant="top" src={post.imageUrl} height="500px" />
        <Card.Body>
          <PostNavbar post={post} />
          <button className="post__likes-button" onClick={showCommentLikes}>
            {post.likes.length === 0
              ? "No likes"
              : post.likes.length === 1
              ? "1 like"
              : post.likes.length + " likes"}
          </button>
          <Comments post={post} />
        </Card.Body>
      </Card>

      <PostModal
        showModal={showOptionsModal}
        hideOptions={hideOptions}
        postId={post.id}
        postCreator={post.creator}
      />

      <CommentLikesModal
        showModal={showCommentLikesModal}
        hideModal={hideCommentLikes}
        likes={post.likes}
      />
    </>
  );
}
