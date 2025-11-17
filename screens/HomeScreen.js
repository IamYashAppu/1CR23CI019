import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { auth } from '../firebaseConfig'; // Import auth
import { signOut } from 'firebase/auth';

const HomeScreen = () => {

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // The onAuthStateChanged listener in App.js will handle navigation
      })
      .catch((error) => {
        Alert.alert('Logout Error', error.message);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Welcome, {auth.currentUser?.email}!
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;