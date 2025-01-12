import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { vehiclesCollection } from '../../firebaseConfig'; // Adjust the import path as needed
import { addDoc } from 'firebase/firestore';

const AddVehicle = () => {
  const [vehicleInfo, setVehicleInfo] = useState({
    model: '',
    year: '',
    licensePlate: '',
  });

  const handleInputChange = (field, value) => {
    setVehicleInfo({ ...vehicleInfo, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(vehiclesCollection, vehicleInfo);
      Alert.alert('Vehicle Added', 'Your vehicle information has been submitted.');
    } catch (error) {
      Alert.alert('Error', 'There was an error submitting your vehicle information.');
      console.error('Error adding vehicle: ', error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-600 p-4">
      <Text className="text-2xl font-bold mb-8">Add Vehicle</Text>
      
      {/* Input Fields */}
      <View className="flex-row w-full max-w-md mb-4">
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700 mr-2"
          placeholder="Model Name"
          placeholderTextColor="#A0A0A0"
          value={vehicleInfo.model}
          onChangeText={(value) => handleInputChange('model', value)}
        />
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700"
          placeholder="Model Year"
          placeholderTextColor="#A0A0A0"
          value={vehicleInfo.year}
          onChangeText={(value) => handleInputChange('year', value)}
        />
      </View>
      <TextInput
        className="w-full max-w-md border border-gray-400 rounded-lg p-4 mb-4 text-base bg-gray-200 text-gray-700"
        placeholder="License Plate"
        placeholderTextColor="#A0A0A0"
        value={vehicleInfo.licensePlate}
        onChangeText={(value) => handleInputChange('licensePlate', value)}
      />

      {/* Submit Button */}
      <TouchableOpacity
        className="w-full max-w-md bg-gray-700 rounded-lg p-4 mb-4"
        onPress={handleSubmit}
      >
        <Text className="text-center text-white font-bold">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddVehicle;