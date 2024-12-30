import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../../firebaseConfig'; // Adjust the import path as needed
import { signOut } from 'firebase/auth';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

const Main = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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
    <View style={{ flex: 1, backgroundColor: 'gray', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
        <TouchableOpacity>
          <Ionicons name="person" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ backgroundColor: 'gray', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Entypo name="menu" size={40} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'darkgray', width: 320, height: 320, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
          {/* QR Code Scanner */}
          
          {scanned && (
            <TouchableOpacity onPress={() => setScanned(false)} style={{ marginTop: 20 }}>
              <Text style={{ color: 'blue' }}>Tap to Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 16 }}>
        <TouchableOpacity>
          <View style={{ backgroundColor: 'gray', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Fontisto name="history" size={30} color="black" />
          </View>
        </TouchableOpacity>
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
    </View>
  );
};

export default Main;