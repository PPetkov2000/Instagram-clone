import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

export default function AddComment({ comments, setComments }) {
  const [comment, setComment] = useState("");

  const publishComment = () => {
    setComments([
      ...comments,
      { creatorId: Math.random(), creator: "User Three", comment },
    ]);
    setComment("");
  };

  return (
    <div className="add-comment mt-3">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Add comment..."
          aria-label="Add comment..."
          aria-describedby="basic-addon2"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <InputGroup.Append>
          <Button
            variant="success"
            href="#publish"
            onClick={publishComment}
            disabled={!comment}
          >
            Publish
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
