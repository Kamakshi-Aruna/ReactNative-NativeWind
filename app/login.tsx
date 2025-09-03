import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      // Get user data from AsyncStorage
      const userData = await AsyncStorage.getItem('user_' + email.toLowerCase());
      
      if (!userData) {
        Alert.alert('Error', 'No account found with this email');
        return;
      }

      const user = JSON.parse(userData);
      
      // Check if password matches
      if (user.password === password) {
        // Store current logged in user
        await AsyncStorage.setItem('currentUser', JSON.stringify({
          name: user.name,
          email: user.email,
          loginTime: new Date().toISOString()
        }));
        
        router.push('/home');
      } else {
        Alert.alert('Error', 'Invalid password');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 px-6">
      <View className="w-full max-w-sm">
        <Text className="text-3xl font-bold text-center mb-8 text-gray-800">
          Login
        </Text>
        
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

          {/*<input*/}
          {/*  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800"*/}
          {/*  placeholder="Enter your email"*/}
          {/*  value={email}*/}
          {/*  onChange={(e) => setEmail(e.target.value)}*/}
          {/*  type="email"*/}
          {/*  autoComplete="email"*/}
          {/*/>*/}

        </View>

        <View className="mb-6">
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

        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: '#3B82F6',
            paddingVertical: 12,
            borderRadius: 8,
            marginBottom: 16,
          }}
          onPress={() => {
            console.log('Login button pressed!');
            handleLogin();
          }}
          activeOpacity={0.7}
        >
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
            Login
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => router.push('/signup')}
        >
          <Text className="text-center text-blue-500 font-medium">
            Don't have an account? Sign up here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}