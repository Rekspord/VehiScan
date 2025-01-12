import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


const Menu = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
        await signOut(auth);
        // Navigate to the login page or handle post-logout actions
        } catch (error) {
        Alert.alert('Error', error.message);
        }
    };

    const handleAddVehicle = () => {
      router.push('addVehicle');
    };

    const handleProfile = () => {
      router.push('profile');
    };

    const handleVehicle= () => {
      router.push('vehicles');
    };

    const handleHistory = () => {
      router.push('history');
    };




  return (
    <View className="flex-1 justify-center items-center bg-gray-600 p-4">
      <View className="position-relative justify-content-center bottom-72 left-0 right-0">
          <TouchableOpacity onPress={handleProfile} className="bg-gray-600 p-4 rounded">
            <Ionicons name="person" size={30} color="gray-800" />
          </TouchableOpacity>
      </View>

      
      <View className="w-full mb-4 bottom-56">
        <TouchableOpacity onPress={handleAddVehicle} className="bg-gray-800 p-4 rounded w-full">
          <Text className="text-white text-center">Add Vehicle</Text>
        </TouchableOpacity>
      </View>

      <View className="w-full mb-4 bottom-56">
        <TouchableOpacity onPress={handleVehicle} className="bg-gray-800 p-4 rounded w-full">
          <Text className="text-white text-center">Vehicles</Text>
        </TouchableOpacity>
      </View>
      
      <View className="w-full mb-4 bottom-56">
        <TouchableOpacity onPress={handleHistory} className="bg-gray-800 p-4 rounded w-full">
          <Text className="text-white text-center">History</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        className="bg-red-500 p-4 rounded w-full top-56"
        onPress={handleLogout}
      >
        <Text className="text-white text-center">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;