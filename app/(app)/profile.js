import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';

const Profile = () => {
const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gray-600 p-4">
      <View className="bg-white p-4 rounded">
        <Image
          source={{ uri: 'https://example.com/profile-picture.jpg' }}
          className="w-20 h-20 rounded-full"
        />
        <Text className="text-black text-center text-lg">John Doe</Text>
        <Text className="text-gray-500 text-center text-sm">john.doe@example.com</Text>
      </View>
      <View className="mt-4">
        <TouchableOpacity className="bg-green-500 p-4 rounded">
          <Text className="text-white text-center">Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;