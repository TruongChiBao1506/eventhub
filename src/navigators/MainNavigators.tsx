import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { EventDetail, ProfileScreen, SplashScreen } from '../screen';
import DrawerNavigator from './DrawerNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
// import DrawerNavigator from './DrawerNavigator';

const MainNavigators = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigators