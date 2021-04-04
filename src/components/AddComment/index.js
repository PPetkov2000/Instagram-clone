import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { projectFirestore, timestamp } from "../../firebase/config";
import { useAuth } from "../../utils/authProvider";
import requester from "../../firebase/requester";

const AddComment = ({ post }) => {
  const [comment, setComment] = useState("");
  const authUser = useAuth();
  const authUserId = authUser && authUser.uid;

  const publishComment = () => {
    projectFirestore
      .collection("posts")
      .doc(post.id)
      .collection("comments")
      .add({
        text: comment,
        creatorId: authUserId,
        creatorUsername: authUser && authUser.username,
        postId: post.id,
        timestamp: timestamp(),
        likes: [],
      })
      .then(() => {
        if (authUserId === post.creator) return;

        requester
          .get("instagramUsers", post.creator)
          .then((res) => {
            const notifications = res.data().notifications;

            notifications.push({
              id: authUserId,
              username: authUser && authUser.username,
              profileImage: authUser && authUser.profileImage,
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
