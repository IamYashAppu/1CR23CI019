import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';

// Import Firebase auth
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  // This effect runs on app startup
  useEffect(() => {
    // onAuthStateChanged is a listener from Firebase
    // It checks if the user's login state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user state
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // If user IS logged in, show the Home screen
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // If user is NOT logged in, show Auth screens
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }} // Hides the header
            />
            <Stack.Screen 
              name="SignUp" 
              component={SignUpScreen} 
              options={{ headerShown: false }} // Hides the header
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}