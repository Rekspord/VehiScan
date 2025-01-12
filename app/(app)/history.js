import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const History = () => {
  const [expandedVehicle, setExpandedVehicle] = useState(null);

  const scannedVehicles = [
    { id: '1', type: 'Car', data: 'Audi A4' },
    { id: '2', type: 'Truck', data: 'Ford F-150' },
    { id: '3', type: 'Motorcycle', data: 'Harley Davidson' },
    // Add more scanned vehicles here
  ];

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
      <Text className="text-lg text-white text-center">{item.data}</Text>
      {item.id === expandedVehicle && (
        <Text className="text-sm text-gray-500 text-center">
          Expanded information about {item.data}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 justify-center items-center bg-gray-600 p-4">
      <Text className="text-2xl text-white text-center font-bold">HISTORY</Text>
      <FlatList
        data={scannedVehicles}
        renderItem={renderVehicle}
        keyExtractor={item => item.id}
        className="mt-4 w-full"
      />
    </View>
  );
};

export default History;