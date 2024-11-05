import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../../redux/reducers/authReducer'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  return (
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>ProfileScreen</Text>
      <Button onPress={() =>dispatch(removeAuth({}))} title='LogOut'/>
    </View>
  )
}

export default ProfileScreen