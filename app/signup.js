import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useAuth } from '../context/authContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { register } = useAuth();

  const handleSignup = () => {
    register(email, password, username);
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-4">Sign Up</Text>
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}