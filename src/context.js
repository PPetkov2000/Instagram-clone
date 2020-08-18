import React from "react";

const globalState = {
  username: "random_user",
  posts: [
    // {
    //   id: 1,
    //   username: "User One",
    //   userImageUrl:
    //     "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
    //   imageUrl:
    //     "https://static.posters.cz/image/750/%D0%BF%D0%BB%D0%B0%D0%BA%D0%B0%D1%82/avengers-infinity-war-one-sheet-i58560.jpg",
    // },
    // {
    //   id: 2,
    //   username: "User Two",
    //   userImageUrl: "/images/user_icon.png",
    //   imageUrl: "/images/endgame_post.jpg",
    // },
  ],
  comments: [
    {
      creatorId: 1,
      creator: "User One",
      comment: "Comment One",
    },
    {
      creatorId: 2,
      creator: "User Two",
      comment: "Comment Two",
    },
  ],
};

function Context({ children }) {
  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export const GlobalStateContext = React.createContext(globalState);
export default Context;
