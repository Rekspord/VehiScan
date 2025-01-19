import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig'; // Adjust the import path as needed
import { signOut } from 'firebase/auth';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { handleBarCodeScanned } from "./qrCodeUtils";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Link, useRouter } from 'expo-router';

const Main = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (isValidUrl(data)) {
      Alert.alert('Scanned URL', data);
    } else {
      Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }
  };

  const handleQRCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("QR Code Scanned", `Type: ${type}\nData: ${data}`);
  };

  const processAnyQRCode = (type, data) => {
    setScanned(true);
    Alert.alert("QR Code Processed", `Type: ${type}\nData: ${data}`);
    // Add additional logic here to handle any kind of QR code as needed
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Navigate to the login page or handle post-logout actions
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleProfile = () => {
    router.push('profile');
  };

  return (
      <View className="flex-1 bg-gray-600 justify-between">
        <View className="flex-row justify-between items-center p-4">
          <TouchableOpacity onPress={handleProfile}>
            <Ionicons name="person" size={30} color="black" />
          </TouchableOpacity>
          <Link href="menu">
            <View className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center">
              <Entypo name="menu" size={40} color="black" />
            </View>
          </Link>
        </View>

        <View className="flex-1 justify-center items-center">
          <View className="bg-darkgray w-80 h-80 rounded-lg flex items-center justify-center">
            {/* QR Code Scanner */}
            <CameraView
              style={{ width: 400, height: 500 }}
              facing="back"
              onBarcodeScanned={(qrcode) => {
                scanned ? undefined : processAnyQRCode(qrcode.type, qrcode.data);
              }}
            />

            {scanned && (
              <TouchableOpacity onPress={() => setScanned(false)} className="mt-5 p-2 bg-white rounded">
                <Text className="text-black">SCAN AGAIN</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View className="flex-row justify-between items-center px-4 pb-4">
          <TouchableOpacity>
            <View className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center">
              <Fontisto name="history" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-5 p-2 bg-red-500 rounded"
            onPress={handleLogout}
          >
            <Text className="text-white">Log Out</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Main;
