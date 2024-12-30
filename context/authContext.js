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
      // Implement login logic here
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    try {
      // Implement logout logic here
    } catch (error) {
      console.error(error);
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
        return {success: false, msg: e.message};
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);