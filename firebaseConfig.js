// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC75-QlNQO0MnP5rqLG5LFz-KiExN-6vH4",
  authDomain: "vehiscan2.firebaseapp.com",
  projectId: "vehiscan2",
  storageBucket: "vehiscan2.firebasestorage.app",
  messagingSenderId: "598308343802",
  appId: "1:598308343802:web:6513c298b3b1757d795e43"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersCollection = collection(db, "users");
export const vehiclesCollection = collection(db, "vehicles");