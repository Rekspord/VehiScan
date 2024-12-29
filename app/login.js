import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/authContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-800 px-4">
      {/* Logo Section */}
      <View className="mb-8 items-center">
        <Image
          //source={require('./path-to-your-logo.png')} // Replace with your actual logo path
          style={{ width: 100, height: 100, marginBottom: 8 }}
        />
        <Text className="text-4xl font-bold text-white">VehiScan</Text>
      </View>

      {/* Input Fields */}
      <TextInput
        className="w-full max-w-md border border-gray-400 rounded-lg p-4 mb-4 text-base bg-gray-200 text-gray-700"
        placeholder="ID Number"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full max-w-md border border-gray-400 rounded-lg p-4 mb-4 text-base bg-gray-200 text-gray-700"
        placeholder="Password"
        placeholderTextColor="#A0A0A0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity
        className="w-full max-w-md bg-gray-700 rounded-lg p-4 mb-4"
        onPress={handleLogin}
      >
        <Text className="text-center text-white font-bold">Log In</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center justify-center my-4">
        <View className="h-px flex-1 bg-gray-500" />
        <Text className="text-gray-400 mx-2">Or sign in with</Text>
        <View className="h-px flex-1 bg-gray-500" />
      </View>

      {/* Social Buttons */}
      <TouchableOpacity className="w-full max-w-md flex-row bg-gray-700 rounded-lg p-4 items-center justify-center mb-2">
        <Text className="text-white font-bold">Google</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full max-w-md flex-row bg-gray-700 rounded-lg p-4 items-center justify-center">
        <Text className="text-white font-bold">Facebook</Text>
      </TouchableOpacity>

      {/* Create Account */}
      <TouchableOpacity>
        <Text className="text-gray-300 mt-4">Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
