import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { vehiclesCollection, db, app } from '../../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';

/**
 * AddVehicle is a React functional component that provides a user interface for adding a new vehicle to a Firestore database.
 * It includes input fields for various vehicle details, a submit button, and a modal that displays a QR code for the newly added vehicle.
 * The component uses the Firebase Firestore SDK to interact with the database, and the react-native-qrcode-svg library to generate the QR code.
 */
const AddVehicle = () => {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]); // Initial empty array of users

  const [modalVisible, setModalVisible] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState(null);

  const firebase = app;
  const firestore = db;

  useEffect(() => {
    const vehiclesCollectionRef = collection(firestore, 'vehicles');

    const unsubscribe = onSnapshot(vehiclesCollectionRef, (querySnapshot) => {
      const vehicles = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        vehicles.push({
          id: doc.id, 
          licensePlate: data.licensePlate, 
          make: data.make, 
          yearModel: data.yearModel,  
          bodyType: data.bodyType,
          chassisNumber: data.chassisNumber,
          engineNumber: data.engineNumber,
          color: data.color,
          fuel: data.fuel,
          grossWt: data.grossWt,
          netWt: data.netWt,
          netCapacity: data.netCapacity,
          pistonDisplacement: data.pistonDisplacement,
          series: data.series,
          ownerName: data.ownerName
        });
      });
      console.log(vehicles);
      setVehicles(vehicles);
    });

    return () => unsubscribe();
  }, []);

  const [vehicleInfo, setVehicleInfo] = useState({
    licensePlate: '', 
    make: '', 
    yearModel: '',  
    bodyType: '',
    chassisNumber: '',
    engineNumber: '',
    color: '',
    fuel: '',
    grossWt: '',
    netWt: '',
    netCapacity: '',
    pistonDisplacement: '',
    series: '',
    ownerName: ''
});

  const handleInputChange = (field, value) => {
    setVehicleInfo({ ...vehicleInfo, [field]: value.toUpperCase() });
  };

  const handleSubmit = async () => {
    // Log all values to check which might be empty
    console.log('Vehicle Info:', vehicleInfo);
    
    // Check each field individually and log empty ones
    Object.entries(vehicleInfo).forEach(([key, value]) => {
        if (value === '') {
            console.log('Empty field:', key);
        }
    });

    if (Object.values(vehicleInfo).some(value => value === '')) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    try {
      const docRef = await addDoc(vehiclesCollection, vehicleInfo);
      const vehicleId = docRef.id;
      setQrCodeValue(`vehiscan://vehicle/${vehicleId}`);
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Error', 'There was an error submitting your vehicle information.');
      console.error('Error adding vehicle: ', error);
    }
  };

  const handleDownloadQrCode = () => {
    // Implement QR code download logic here
    console.log('QR code downloaded!');
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-600 p-4">
      <Text className="text-2xl font-bold mb-8">Add Vehicle</Text>

      {/* Input Fields */}
      <TextInput
        className="w-full max-w-md border border-gray-400 rounded-lg p-4 mb-4 text-base bg-gray-200 text-gray-700"
        placeholder="Owner Name (full name)"
        placeholderTextColor="#A0A0A0"
        value={vehicleInfo.ownerName}
        onChangeText={(value) => handleInputChange('ownerName', value)}
        autoCapitalize="characters"
      />
      <View className="flex-row w-full max-w-md mb-4">
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700 mr-2"
          placeholder="Make"
          placeholderTextColor="#A0A0A0"
          value={vehicleInfo.make}
          onChangeText={(value) => handleInputChange('make', value)}
          autoCapitalize="characters"
        />
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700"
          placeholder="Model Year"
          placeholderTextColor="#A0A0A0"
          value={vehicleInfo.yearModel}
          onChangeText={(value) => handleInputChange('yearModel', value)}
          autoCapitalize="characters"
        />
      </View>
      <View className="flex-row w-full max-w-md mb-4">
      <TextInput
        className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700 mr-2"
        placeholder="Color"
        placeholderTextColor="#A0A0A0"
        value={vehicleInfo.color}
        onChangeText={(value) => handleInputChange('color', value)}
        autoCapitalize="characters"
      />
      <TextInput
        className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700"
        placeholder="License Plate"
        placeholderTextColor="#A0A0A0"
        value={vehicleInfo.licensePlate}
        onChangeText={(value) => handleInputChange('licensePlate', value)}
        autoCapitalize="characters"
      />
      </View>
      <TextInput
        className="w-full max-w-md border border-gray-400 rounded-lg p-4 mb-4 text-base bg-gray-200 text-gray-700"
        placeholder="Body Type"
        placeholderTextColor="#A0A0A0"
        value={vehicleInfo.bodyType}
        onChangeText={(value) => handleInputChange('bodyType', value)}
        autoCapitalize="characters"
      />
      <TextInput
        className="w-full max-w-md border border-gray-400 rounded-lg p-4 mb-4 text-base bg-gray-200 text-gray-700"
        placeholder="Chassis Number"
        placeholderTextColor="#A0A0A0"
        value={vehicleInfo.chassisNumber}
        onChangeText={(value) => handleInputChange('chassisNumber', value)}
        autoCapitalize="characters"
      />
      <TextInput
        className="w-full max-w-md border border-gray-400 rounded-lg p-4 mb-4 text-base bg-gray-200 text-gray-700"
        placeholder="Engine Number"
        placeholderTextColor="#A0A0A0"
        value={vehicleInfo.engineNumber}
        onChangeText={(value) => handleInputChange('engineNumber', value)}
        autoCapitalize="characters"
      />
      <TextInput
        className="w-full max-w-md border border-gray-400 rounded-lg p-4 mb-4 text-base bg-gray-200 text-gray-700"
        placeholder="Fuel"
        placeholderTextColor="#A0A0A0"
        value={vehicleInfo.fuel}
        onChangeText={(value) => handleInputChange('fuel', value)}
        autoCapitalize="characters"
      />
      <View className="flex-row w-full max-w-md mb-4">
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700 mr-2"
          placeholder="Gross Weight"
          placeholderTextColor="#A0A0A0"
          value={vehicleInfo.grossWt}
          onChangeText={(value) => handleInputChange('grossWt', value)}
          autoCapitalize="characters"
        />
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700"
          placeholder="Net Weight"
          placeholderTextColor="#A0A0A0"
          value={vehicleInfo.netWt}
          onChangeText={(value) => handleInputChange('netWt', value)}
          autoCapitalize="characters"
        />
      </View>
      <View className="flex-row w-full max-w-md mb-4">
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700 mr-2"
          placeholder="Net Capacity"
          placeholderTextColor="#A0A0A0"
          value={vehicleInfo.netCapacity}
          onChangeText={(value) => handleInputChange('netCapacity', value)}
          autoCapitalize="characters"
        />
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700"
          placeholder="Piston Displacement"
          placeholderTextColor="#A0A0A0"
          value={vehicleInfo.pistonDisplacement}
          onChangeText={(value) => handleInputChange('pistonDisplacement', value)}
          autoCapitalize="characters"
        />
      </View>
      <TextInput
        className="w-full max-w-md border border-gray-400 rounded-lg p-4 mb-4 text-base bg-gray-200 text-gray-700"
        placeholder="Series"
        placeholderTextColor="#A0A0A0"
        value={vehicleInfo.series}
        onChangeText={(value) => handleInputChange('series', value)}
        autoCapitalize="characters"
      />

      {/* Submit Button */}
      <TouchableOpacity
        className="w-full max-w-md bg-gray-700 rounded-lg p-4 mb-4"
        onPress={handleSubmit}
      >
        <Text className="text-center text-white font-bold">Submit</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent={true}>
        <View className="flex-1 justify-center items-center bg-gray-600 p-4">
          <Text className="text-2xl font-bold mb-8">Generated QR Code</Text>
          <QRCode value={qrCodeValue} size={200} color="#000" backgroundColor="#fff" />
          <TouchableOpacity
            className="w-full max-w-md bg-gray-700 rounded-lg p-4 mb-4"
            onPress={handleDownloadQrCode}
          >
            <Text className="text-center text-white font-bold">Download QR Code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full max-w-md bg-gray-700 rounded-lg p-4 mb-4"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-center text-white font-bold">Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default AddVehicle;