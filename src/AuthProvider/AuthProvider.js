import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
export const Context = createContext(app);
const auth = getAuth();
const AuthProvider = ({ children }) => {
  const [selectDate, setSelectedDate] = useState(new Date());
  const [user, setuser] = useState({ name: "asif" });

  const registration = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  const login = (email, passoword) => {
    return signInWithEmailAndPassword(auth, email, passoword);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const authInfo = {
    user,
    registration,
    updateUser,
    selectDate,
    login,
    logOut,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <Context.Provider value={authInfo}>{children}</Context.Provider>;
};

export default AuthProvider;
