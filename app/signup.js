import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Pressable} from 'react-native';
import { useAuth } from '../context/authContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, useRouter } from 'expo-router';

export default function Signup() {
  const router = useRouter();
  const {register} = useAuth();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  //const Signup = () => {
    //const [password, setPassword] = useState('');
  //}
  //const handleSignup = () => {
    //register(email, password, username);
  //};

  const handleSignup = async () => {
    if (!password|| !email || !firstName || !lastName) {
      alert('Signup!! Please fill in all fields');
      return;
    }
    try {
      let response = await register(password, email, firstName, lastName);
      console.log('got result: ', response);

      if (response.success) {
        alert('Sign Up', response.msg);
      } else {
        alert('Error', response.msg);
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
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
      <View className="flex-row w-full max-w-md mb-4">
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700 mr-2"
          placeholder="First Name"
          placeholderTextColor="#A0A0A0"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-4 text-base bg-gray-200 text-gray-700"
          placeholder="Last Name"
          placeholderTextColor="#A0A0A0"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <TextInput
        className="w-full max-w-md border border-gray-400 rounded-lg p-4 mb-4 text-base bg-gray-200 text-gray-700"
        placeholder="Email"
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

      {/* Sign Up Button */}
      <TouchableOpacity
        className="w-full max-w-md bg-gray-700 rounded-lg p-4 mb-4"
        onPress={handleSignup}
      >
        <Text className="text-center text-white font-bold">Sign Up</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center justify-center my-4">
        <View className="h-px flex-1 bg-gray-500" />
        <Text className="text-gray-400 mx-2">Or sign up with</Text>
        <View className="h-px flex-1 bg-gray-500" />
      </View>

      {/* Social Buttons */}
      <TouchableOpacity className="w-full max-w-md flex-row bg-gray-700 rounded-lg p-4 items-center justify-center mb-2">
        <AntDesign name="google" size={24} color="white" />
        <Text className="text-white font-bold ml-2">Google</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full max-w-md flex-row bg-gray-700 rounded-lg p-4 items-center justify-center mb-2">
      <FontAwesome name="facebook" size={24} color="white" />
        <Text className="text-white font-bold ml-2">Facebook</Text>
      </TouchableOpacity>

      {/* Create Account */}
      <View className="flex-row items-center justify-center">
        <Text className="text-gray-300 mt-4">Already have an account?</Text>
          <Pressable onPress={() => router.replace('login')}>
          <Text className="text-indigo-500 mt-4"> Log In</Text>
          </Pressable>
      </View>
    </View>
  );
}