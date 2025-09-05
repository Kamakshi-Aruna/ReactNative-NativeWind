import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eff6ff' }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32, minHeight: '100%' }}
        showsVerticalScrollIndicator={true}
        bounces={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
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

        <View className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <Text className="text-2xl font-bold mb-4 text-blue-700">
            💡 Why Choose React Native?
          </Text>
          
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-800">For Startups</Text>
            <Text className="text-gray-600 mb-3 leading-6">
              Perfect for rapid prototyping and MVP development. Get to market faster with limited resources.
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-800">For Enterprises</Text>
            <Text className="text-gray-600 mb-3 leading-6">
              Trusted by Facebook, Instagram, Airbnb, and Tesla. Proven scalability for large applications.
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-800">For Developers</Text>
            <Text className="text-gray-600 mb-3 leading-6">
              Use familiar React skills to build mobile apps. Easy transition from web to mobile development.
            </Text>
          </View>

          <View className="bg-blue-50 rounded-lg p-4 mt-4">
            <Text className="text-blue-800 font-semibold mb-2">🎯 Perfect Use Cases:</Text>
            <Text className="text-blue-700">• Social media apps • E-commerce platforms</Text>
            <Text className="text-blue-700">• Productivity tools • Content delivery apps</Text>
            <Text className="text-blue-700">• Real-time chat apps • Educational platforms</Text>
          </View>
        </View>

        <TouchableOpacity
          className="w-full bg-red-500 py-3 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}