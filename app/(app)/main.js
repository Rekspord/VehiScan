import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../../firebaseConfig'; // Adjust the import path as needed
import { signOut } from 'firebase/auth';

const Main = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // Handle the scanned data as needed
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Navigate to the login page or handle post-logout actions
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Main Page!</Text>
      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)} style={{ marginTop: 20 }}>
          <Text style={{ color: 'blue' }}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: 'red',
          borderRadius: 5,
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: 'white' }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;