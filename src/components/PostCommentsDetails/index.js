import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import PostNavbar from "../PostNavbar";
import Comments from "../Comments";
import AddComment from "../AddComment";
import { GlobalStateContext } from "../../context";
import { projectFirestore } from "../../firebase/config";

const PostCommentsDetails = (props) => {
  const context = useContext(GlobalStateContext);
  const postId = props.match.params.id;
  const [imageUrl, setImageUrl] = useState("");

  projectFirestore
    .collection("posts")
    .doc(postId)
    .get()
    .then((post) => setImageUrl(post.data().imageUrl));

<<<<<<< HEAD
=======
const PostCommentsDetails = (props) => {
  console.log(props);
>>>>>>> 5e8e555d71d2a7821387c40e550f69edbaf3fe77
  return (
    <div className="details-container">
      <img src={imageUrl} alt="post" className="post-image" />
      <aside className="comments-section">
        <Card>
          <Card.Header className="post-details-header">
            <Card.Link href="#profile">
              <Card.Img
                variant="top"
                src="/images/user_icon.png"
                className="card-header-img"
              />
            </Card.Link>
            <strong>random_user:</strong> <Link to="#follow">Follow</Link>
          </Card.Header>
          <Card.Body>
            <Comments postId={postId} showAddComment={false} />
          </Card.Body>
          <Card.Footer className="post-details-footer">
            <PostNavbar postId={postId} />
            <strong>1000 likes</strong>
            <p className="text-muted">2 hours ago</p>
            <AddComment postId={postId} username={context.username} />
          </Card.Footer>
        </Card>
      </aside>
    </div>
  );
};

export default PostCommentsDetails;
