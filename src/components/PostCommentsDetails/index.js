import React from "react";
import { Card } from "react-bootstrap";
import PostNavbar from "../PostNavbar";
import Comments from "../Comments";

const PostCommentsDetails = (props) => {
  console.log(props);
  return (
    <div className="details-container">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/teammanager-a529e.appspot.com/o/desktop-image3.jpg?alt=media&token=924df7bb-456e-4691-9d18-37dc97be9906"
        className="post-image"
      />
      <aside className="comments-section">
        <Card>
          <Card.Header>
            <strong>random_user:</strong> Follow
          </Card.Header>
          <Card.Body>Bodyasdadasdsafasfasfsafafasfasf</Card.Body>
          <Card.Footer>
            <PostNavbar />
            <strong>1000 likes</strong>
            <p className="text-muted">2 hours ago</p>
          </Card.Footer>
        </Card>
      </aside>
    </div>
  );
}

export default PostCommentsDetails;
