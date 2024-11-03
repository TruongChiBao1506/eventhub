import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AuthNavigator = () => {

  const Stack = createNativeStackNavigator();
    
  return (
    <View>
      <Text>AuthNavigator</Text>
    </View>
  )
}

export default AuthNavigator