import React, { useState } from "react";
import Story from "../Story";

export default function Stories() {
  const [stories, setStories] = useState([
    {
      storyId: 1,
      username: "User One",
      userImageUrl: "/images/user_icon.png",
    },
    {
      storyId: 2,
      username: "User Two",
      userImageUrl: "/images/user_icon.png",
    },
    {
      storyId: 3,
      username: "User Three",
      userImageUrl: "/images/user_icon.png",
    },
    {
      storyId: 4,
      username: "User Four",
      userImageUrl: "/images/user_icon.png",
    },
    {
      storyId: 5,
      username: "User Five",
      userImageUrl: "/images/user_icon.png",
    },
    {
      storyId: 6,
      username: "User Six",
      userImageUrl: "/images/user_icon.png",
    },
    {
      storyId: 7,
      username: "User Seven",
      userImageUrl: "/images/user_icon.png",
    },
  ]);

  return (
    <div className="stories-container">
      {stories.map((story) => {
        return <Story key={story.storyId} story={story} />;
      })}
    </div>
  );
}
