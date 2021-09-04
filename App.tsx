import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import Lovideo from './src/components/Lovideo.component';
import { MainView } from './src/MainView';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>

        <Stack.Screen
          name='MainView'
          component={MainView} />

        <Stack.Screen
          name='Video'
          component={Lovideo} />

      </Stack.Navigator>

    </NavigationContainer>
  )
};

export default App;
