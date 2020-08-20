import React from "react";

const globalState = {
  username: "random_user",
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
