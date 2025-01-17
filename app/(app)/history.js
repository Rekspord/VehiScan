import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { vehiclesCollection, db, app } from '../../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const History = () => {
  const [expandedVehicle, setExpandedVehicle] = useState(null);
  const [scannedVehicles, setScannedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vehicles, setVehicles] = useState([]); // Initial empty array of users

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderVehicle = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (expandedVehicle === item.id) {
          setExpandedVehicle(null);
        } else {
          setExpandedVehicle(item.id);
        }
      }}
      className="bg-gray-800 p-4 rounded mb-2 w-full flex-1 justify-center items-center"
    >
      <Text className="text-lg text-white text-center">{item.licensePlate} - {item.make}</Text>
      {item.id === expandedVehicle && (
        <View className="bg-gray-800 p-4 rounded mb-2 w-full flex-1 justify-center items-center">
          <View className="flex-1 ">
            <Text className="text-white">Vehicle ID: {item.id}</Text>
            <Text className="text-white">Owner Name: {item.ownerName}</Text>
            <Text className="text-white">License Plate: {item.licensePlate}</Text>
            <Text className="text-white">Make: {item.make}</Text>
            <Text className="text-white">Year Model: {item.yearModel}</Text>
            <Text className="text-white">Color: {item.color}</Text>
            <Text className="text-white">Body Type: {item.bodyType}</Text>
            <Text className="text-white">Chassis Number: {item.chassisNumber}</Text>
            <Text className="text-white">Engine Number: {item.engineNumber}</Text>
            <Text className="text-white">Fuel: {item.fuel}</Text>
            <Text className="text-white">Gross Weight: {item.grossWt}</Text>
            <Text className="text-white">Net Weight: {item.netWt}</Text>
            <Text className="text-white">Net Capacity: {item.netCapacity}</Text>
            <Text className="text-white">Piston Displacement: {item.pistonDisplacement}</Text>
            <Text className="text-white">Series: {item.series}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-600 p-4">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-600 p-4">
        <Text className="text-lg text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-600 p-4">
      <Text className="text-2xl text-white text-center font-bold">HISTORY</Text>
      <FlatList
        data={vehicles} 
        renderItem={renderVehicle}
        keyExtractor={item => item.id}
        className="mt-4 w-full"
      />
    </View>
  );
};

export default History;