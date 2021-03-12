import React from "react";
import { Figure } from "react-bootstrap";

const Story = ({ story }) => {
  return (
    <Figure className="stories__story">
      <Figure.Image
        alt="user_image"
        src={story.userImageUrl}
        className="stories__story-image"
      />
      <Figure.Caption className="text-center">{story.username}</Figure.Caption>
    </Figure>
  );
};

export default Story;
