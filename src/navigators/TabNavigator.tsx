import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../screen';
import ExploreNavigator from './ExploreNavigator';

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name = "ExploreNavigator" component={ExploreNavigator}/>
    </Tab.Navigator>
  )
}

export default TabNavigator