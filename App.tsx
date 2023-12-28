/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MyStack from './components/MyStack';

function App(): React.JSX.Element {
  return (
    //https://reactnative.dev/docs/navigation
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default App;
