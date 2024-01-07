/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './src/firebase/firebaseConfig';

import { Login, LoginScreen, HomeScreen, ProfileScreen, RegistrationScreen, SettingsScreen, AccountScreen } from './src/screens/index';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null); // Update the type of user state

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user); // Update the user state
    });
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
