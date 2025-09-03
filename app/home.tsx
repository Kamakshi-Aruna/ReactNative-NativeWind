import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await AsyncStorage.getItem('currentUser');
        if (currentUser) {
          const user = JSON.parse(currentUser);
          setUserName(user.name);
        }
      } catch (error) {
        console.log('Error getting current user:', error);
      }
    };

    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      router.push('/welcome');
    } catch (error) {
      console.log('Error logging out:', error);
      router.push('/welcome');
    }
  };

  return (
    <ScrollView className="flex-1 bg-blue-50">
      <View className="px-6 py-8">
        <Text className="text-4xl font-bold text-center mb-4 text-blue-800">
          Welcome{userName ? `, ${userName}` : ''}!
        </Text>
        
        <View className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <Text className="text-2xl font-bold mb-4 text-gray-800">
            About React Native
          </Text>
          
          <Text className="text-gray-600 mb-4 leading-6">
            React Native is a powerful framework that lets you build native mobile apps using React. 
            Write once, run anywhere - create amazing iOS and Android apps with JavaScript and React.
          </Text>
          
          <Text className="text-gray-600 mb-4 leading-6">
            ✨ Key Features:
          </Text>
          
          <Text className="text-gray-600 mb-2">• Cross-platform development</Text>
          <Text className="text-gray-600 mb-2">• Native performance</Text>
          <Text className="text-gray-600 mb-2">• Hot reloading</Text>
          <Text className="text-gray-600 mb-4">• Rich ecosystem</Text>
        </View>

        <TouchableOpacity
          className="w-full bg-red-500 py-3 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}