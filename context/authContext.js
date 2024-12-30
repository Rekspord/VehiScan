import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useEffect, useState, useContext } from "react";
import { auth, db } from "../firebaseConfig";
import {doc, getDoc, setDoc} from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return unsub;
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return {success: true};
    } catch (error) {
      let msg = error.message;
      if (msg.includes('auth/invalid-email')) msg = 'Please enter a valid email address.';
      if (msg.includes('auth/invalid-credentials')) msg = 'Please enter a valid email address.';
      return {success: false, msg: error.message};
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const register = async (password, email, firstName, lastName) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password, firstName, lastName);
      console.log('response.user :', response?.user);

      await setDoc(doc(db, "users", response?.user?.uid), {
        email,
        password,
        firstName,
        lastName,
        userId: response?.user?.uid,
      });
      return {success: true, data: response?.user};

    } catch (error) {
        let msg = error.message;
        if (msg.includes('auth/invalid-email')) msg = 'Please enter a valid email address.';
        if (msg.includes('auth/email-already-in-use')) msg = 'Email already in use.';
        return {success: false, msg: error.message};
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);