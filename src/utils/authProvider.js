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

  const signup = (email, password) => {
    return projectAuth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return projectAuth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return projectAuth.signOut();
  };

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
    <AuthContext.Provider value={{ ...authState, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
