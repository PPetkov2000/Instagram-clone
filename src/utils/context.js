import React, { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { generateUserDocument } from "../firebase/user";

const Context = ({ children }) => {
  const [userObj, setUserObj] = useState({
    user: null,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      setUserObj({ user });
    });

    return () => unsub();
  }, []);

  return (
    <GlobalStateContext.Provider value={userObj.user}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const GlobalStateContext = React.createContext({
  user: null,
});
export default Context;
