
import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBXERj0QfK4RUZVGQOcRxzYVl6S2wPPvyY",
  authDomain: "authenticationapp-3370e.firebaseapp.com",
  projectId: "authenticationapp-3370e",
  storageBucket: "authenticationapp-3370e.firebasestorage.app",
  messagingSenderId: "347976789026",
  appId: "1:347976789026:web:437a61f7625a8d3548ee7b"
};

// Initialize Firebase only if it hasn't been initialized yet
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with React Native persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  // If auth is already initialized, just get it
  auth = getAuth(app);
}

export { auth };