import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const handleSignOut = async () => {
    dispatch(removeAuth({}));
    await AsyncStorage.clear();
  };
  return (
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>ProfileScreen</Text>
      <Button onPress={handleSignOut} title='LogOut'/>
    </View>
  )
}

export default ProfileScreen