/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import LoginEmail from './screens/LoginEmail';
import RegisterEmail from './screens/RegisterEmail';
import Home from './screens/Home';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="LoginEmail" component={LoginEmail} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterEmail" component={RegisterEmail} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default MyStack;
