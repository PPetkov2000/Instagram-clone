import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/authProvider";
import { createComment } from "../../utils/userActions";

const AddComment = ({ post }) => {
  const [comment, setComment] = useState("");
  const { authUser } = useAuth();

  return (
    <div className="add-comment mt-3">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Add comment..."
          aria-label="Add comment..."
          aria-describedby="Add comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <InputGroup.Append>
          <Button
            variant="success"
            onClick={() => {
              createComment(authUser, post, comment);
              setComment("");
            }}
            disabled={!comment}
          >
            Publish
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default AddComment;
