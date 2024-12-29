import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    if (typeof isAuthenticated === 'undefined') return;
    const inApp = segments[0] === '(app)';
    if (isAuthenticated && !inApp) {
      // Redirect the user to the app
      router.replace('main');
    } else if (isAuthenticated === false) {
      // Redirect the user to the login page
      router.replace('login');
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}