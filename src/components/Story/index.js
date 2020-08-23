import React from "react";
import { Figure } from "react-bootstrap";

const Story = ({ story }) => {
  return (
    <Figure>
      <Figure.Image
        width={70}
        height={70}
        alt="user_image"
        src={story.userImageUrl}
        className="figure-img"
      />
      <Figure.Caption className="text-center">{story.username}</Figure.Caption>
    </Figure>
  );
}

export default Story;
