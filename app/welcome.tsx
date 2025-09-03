import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-blue-500 px-6">
      <View className="w-full max-w-sm items-center">
        <Text className="text-4xl font-bold text-center mb-4 text-white">
          Welcome to
        </Text>
        <Text className="text-3xl font-bold text-center mb-2 text-yellow-300">
          React Native
        </Text>
        <Text className="text-lg text-center mb-8 text-blue-100">
          Build amazing mobile apps with the power of React
        </Text>
        
        <View className="w-full space-y-4">
          <TouchableOpacity
            className="w-full bg-white py-3 rounded-lg shadow-lg"
            onPress={() => router.push('/signup')}
          >
            <Text className="text-blue-600 text-center font-semibold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="w-full border-2 border-white py-3 rounded-lg"
            onPress={() => router.push('/login')}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}