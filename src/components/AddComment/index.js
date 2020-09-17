import React, { useState, useContext } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { projectFirestore, timestamp } from "../../firebase/config";
import { GlobalStateContext } from "../../utils/context";
import requester from "../../firebase/requester";

const AddComment = ({ post }) => {
  const [comment, setComment] = useState("");
  const context = useContext(GlobalStateContext);
  const uid = context && context.uid;

  const publishComment = () => {
    projectFirestore
      .collection("posts")
      .doc(post.id)
      .collection("comments")
      .add({
        text: comment,
        creator: context && context.username,
        postId: post.id,
        timestamp: timestamp(),
      })
      .then(() => {
        if (uid === post.creator) return;

        requester
          .get("instagramUsers", post.creator)
          .then((res) => {
            const notifications = res.data().notifications;

            notifications.push({
              id: uid,
              username: context && context.username,
              profileImage: context && context.profileImage,
              timestamp: new Date(),
              type: "comment",
              postId: post.id,
              postImageUrl: post.imageUrl,
            });

            return requester.update("instagramUsers", post.creator, {
              notifications,
            });
          })
          .catch(console.error);
      })
      .catch(console.error);

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
};

export default AddComment;
