import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      // Store user data in AsyncStorage
      const userData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password,
        createdAt: new Date().toISOString()
      };
      
      await AsyncStorage.setItem('user_' + email.toLowerCase(), JSON.stringify(userData));
      
      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // Navigate to login
      router.push('/login');
      
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 px-6">
      <View className="w-full max-w-sm">
        <Text className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create Account
        </Text>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Full Name</Text>
          <TextInput
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            placeholder="Enter your full name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Email</Text>
          <TextInput
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Password</Text>
          <TextInput
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-medium">Confirm Password</Text>
          <TextInput
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            placeholder="Confirm your password"
            placeholderTextColor="#9CA3AF"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: '#10B981',
            paddingVertical: 12,
            borderRadius: 8,
            marginBottom: 16,
          }}
          onPress={() => {
            console.log('Button pressed!');
            handleSignup();
          }}
          activeOpacity={0.7}
        >
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
            Create Account
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => router.push('/login')}
        >
          <Text className="text-center text-blue-500 font-medium">
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}