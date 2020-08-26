import React from "react";
import { Button } from "react-bootstrap";
import { BsCursor } from "react-icons/bs";

const InitialMessageView = () => {
  return (
    <div className="messages-initial">
      <BsCursor className="messages-initial-icon" />
      <h4>Your messages</h4>
      <p className="text-muted mb-4">
        Send your pictures and messages to a friend or a group
      </p>
      <Button>Send message</Button>
    </div>
  );
};

export default InitialMessageView;
