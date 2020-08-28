import React, { useState } from "react";
import Suggestion from "../Suggestion";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      userSuggested: "random_user",
      userFollowers: [
        "your_friend",
        "random_user_one",
        "random_user_two",
        "random_user_three",
      ],
    },
    {
      id: 2,
      userSuggested: "some_user",
      userFollowers: ["your_friend", "random_user_one", "random_user_two"],
    },
    {
      id: 3,
      userSuggested: "random_user",
      userFollowers: [
        "your_friend",
        "random_user_one",
        "random_user_two",
        "random_user_three",
        "random_user_four",
      ],
    },
    {
      id: 4,
      userSuggested: "some_user",
      userFollowers: ["your_friend", "random_user_one", "random_user_two"],
    },
  ]);

  return suggestions.map((suggestion) => {
    return <Suggestion key={suggestion.id} suggestion={suggestion} />;
  });
};

export default Suggestions;
