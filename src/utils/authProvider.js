import React, { useState, useEffect, useContext } from "react";
import { projectAuth } from "../firebase/config";
import { generateUserDocument } from "../firebase/user";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    loading: true,
    authUser: null,
    isLoggedIn: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(async (userAuth) => {
      const userInfo = await generateUserDocument(userAuth);
      if (userAuth) {
        setAuthState({ isLoggedIn: true, loading: false, authUser: userInfo });
      } else {
        setAuthState({ ...authState, loading: false, authUser: null });
      }
    });

    return () => unsub();
  }, [authState]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
