import React, { useState, useEffect, useContext } from "react";
import { projectAuth } from "../firebase/config";
import { generateUserDocument } from "../firebase/user";

const GlobalStateContext = React.createContext(null);

const Context = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(async (userAuth) => {
      const userInfo = await generateUserDocument(userAuth);
      setUser(userInfo);
    });

    return () => unsub();
  }, []);

  return (
    <GlobalStateContext.Provider value={user}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalStateContext);
}
export default Context;
