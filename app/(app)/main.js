import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig'; // Adjust the import path as needed
import { signOut } from 'firebase/auth';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { handleBarCodeScanned } from "./qrCodeUtils";
import { CameraView, useCameraPermissions } from 'expo-camera';


const Main = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState('');


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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Navigate to the login page or handle post-logout actions
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const validateProps = (minSize, maxSize, toleranceFactor) => {
    if (minSize == null || maxSize == null || toleranceFactor == null) {
      throw new Error(
        "QRCodeScanner: minSize, maxSize, and toleranceFactor must be provided."
      );
    }
    if (
      typeof minSize !== "number" ||
      typeof maxSize !== "number" ||
      typeof toleranceFactor !== "number"
    ) {
      throw new Error(
        "QRCodeScanner: minSize, maxSize, and toleranceFactor must be numbers."
      );
    }
  };

  
    const handleScan = (scanData) => {
      if (!scanningInfinitely) {
        setScanned(true);
      }
  
      const cameraViewSize = {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      };
  
      if (
        handleBarCodeScanned(
          scanData.type,
          scanData.data,
          scanData.cornerPoints,
          cameraViewSize,
          minSize,
          maxSize,
          toleranceFactor
        )
      ) {
        if (onScanSuccess) {
          onScanSuccess(scanData);
        }
      } else {
        if (onScanFail) {
          onScanFail(scanData);
        }
      }
    }; 

    const handleBarcode = async (barcode) => {
      if (!scanned) {
        setScanned(true); // limits scan
        setBarcode(barcode); // stores barcode
        checkBarcodeStatus(barcode).then((status) => {
          if (status === 0) {
            console.log("Barcode found");
            setModalVisible(true);
            setModalType("found"); // Set the modal type to "found"
          } else if (status === 1) {
            console.log("Barcode not found");
            setModalVisible(true);
            setModalType("notFound"); // Set the modal type to "notFound"
          } else {
            console.log("Error checking barcode.");
          }
        });
      }
    };

  return (
      <View className="flex-1 bg-gray-600 justify-between">
        <View className="flex-row justify-between items-center p-4">
          <TouchableOpacity>
            <Ionicons name="person" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <View className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center">
              <Entypo name="menu" size={40} color="black" />
            </View>
          </TouchableOpacity>
        </View>


        <View className="flex-1 justify-center items-center">
          <View className="bg-darkgray w-80 h-80 rounded-lg flex items-center justify-center">
            {/* QR Code Scanner */}
            <CameraView
              style={{ width: 400, height: 600 }}
              className="w-full h-full"
              facing="back"
              onBarcodeScanned={(barcode) => {
                scanned ? undefined : handleBarcode(barcode.data);
              }}
            />
            
            {scanned && (
              <TouchableOpacity onPress={() => setScanned(false)} className="mt-5">
                <Text className="text-blue-500">Tap to Scan Again</Text>
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