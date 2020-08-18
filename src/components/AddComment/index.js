import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { projectFirestore, timestamp } from "../../firebase/config";

export default function AddComment({ postId, username }) {
  const [comment, setComment] = useState("");

  const publishComment = () => {
    projectFirestore
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        text: comment,
        creator: username,
        postId: postId,
        timestamp: timestamp(),
      });

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
