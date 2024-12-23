import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '../screen';
import OnboadingScreen from '../screen/auth/OnboadingScreen';
import SignUpScreen from '../screen/auth/SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Verification from '../screen/auth/Verification';
import ForgotPassword from '../screen/auth/ForgotPassword';

const AuthNavigator = () => {

  // const [isExistingUser, setIsExistingUser] = useState(false);

  // useEffect(() => {
  //   checkUserExisting();
  // }, []);

  const Stack = createNativeStackNavigator();

  // const checkUserExisting = async () => {
  //   const res = await AsyncStorage.getItem('auth');

  //   res && setIsExistingUser(true);
  // }
  // console.log(isExistingUser);
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="OnboadingScreen" component={OnboadingScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="Verification" component={Verification} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
}

export default AuthNavigator
// import { View, Text } from 'react-native'
// import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { LoginScreen, SplashScreen } from '../screen';

// const AuthNavigator = () => {
//   const Stack = createNativeStackNavigator();
//   return (
//     <Stack.Navigator screenOptions={{headerShown:false}}>
//       {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
//       <Stack.Screen name = "LoginScreen" component={LoginScreen}/>
//     </Stack.Navigator>
//   )
// }

// export default AuthNavigator