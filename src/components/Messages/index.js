import React, { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import Message from "../Message";
import InitialMessageView from "../InitialMessageView";
import UserMessages from "../UserMessages";

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "what's up?",
      user: "random_user",
    },
    {
      id: 2,
      text: "hello there",
      user: "some_user",
    },
    {
      id: 3,
      text: "hey",
      user: "random_user_one",
    },
    {
      id: 4,
      text: "how's it going?",
      user: "some_user_one",
    },
  ]);
  const [messageClicked, setMessageClicked] = useState(false);

  const showCurrentMessage = () => setMessageClicked(true);

  return (
    <div className="messages-container">
      <aside className="messages-section">
        <Card>
          <Card.Header className="messages-header">
            <h5>Direct</h5>
          </Card.Header>
          <Card.Body className="messages-body">
            <ListGroup variant="flush">
              {messages.map((message) => {
                return (
                  <Message
                    key={message.id}
                    message={message}
                    showCurrentMessage={showCurrentMessage}
                  />
                );
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      </aside>
      {messageClicked ? <UserMessages /> : <InitialMessageView />}
    </div>
  );
};

export default Messages;
