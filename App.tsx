// import { useEffect, useState } from "react";
// import { StatusBar, Text, View } from "react-native";
// import { HomeScreen, SplashScreen } from "./src/screen";
// import { NavigationContainer } from "@react-navigation/native";
// import AuthNavigator from "./src/navigators/AuthNavigator";
// import { useAsyncStorage } from "@react-native-async-storage/async-storage";
// import MainNavigators from "./src/navigators/MainNavigators";
// import { Provider } from "react-redux";
// import store from "./src/redux/store";
// import AppRouter from "./src/navigators/AppRouter";
// import { appColors } from "./src/constants/appColor";

// const App = () => {



//   return (
//     <>
//       <Provider store={store}>
//         <StatusBar barStyle="dark-content"
//           backgroundColor="transparent"
//           translucent />
//         <NavigationContainer>
//           <AppRouter />
//         </NavigationContainer>
//       </Provider>
//     </>
//   )
// }
// export default App;
import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screen/home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigators from './src/navigators/MainNavigators';
import AppRouter from './src/navigators/AppRouter';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </Provider>
  )
}

export default App