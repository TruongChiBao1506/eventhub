import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '../screen';
import OnboadingScreen from '../screen/auth/OnboadingScreen';
import SignUpScreen from '../screen/auth/SignUpScreen';

const AuthNavigator = () => {

  const Stack = createNativeStackNavigator();
    
  return <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name = "OnboadingScreen" component={OnboadingScreen}/>
      <Stack.Screen name = "LoginScreen" component={LoginScreen}/>
      <Stack.Screen name = "SignUpScreen" component={SignUpScreen}/>
    </Stack.Navigator>
}

export default AuthNavigator