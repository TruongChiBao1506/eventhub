import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, AuthState, removeAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HandleNotification } from '../../utils/handleNotification'
import { LoadingModal } from '../../modals'

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const auth: AuthState = useSelector(authSelector);
  const handleLogOut = async () => {
    setIsLoading(true);
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');

    if(fcmtoken){
      if(auth.fcmTokens && auth.fcmTokens.length > 0){
        const items = [...auth.fcmTokens];
        const index = auth.fcmTokens.findIndex(element => element === fcmtoken);

        if(index !== -1){
            items.splice(index, 1); 
        }
        await HandleNotification.update(auth.id, items);
        
      }
    }
    await AsyncStorage.removeItem('auth');
    dispatch(removeAuth({}));
    
    setIsLoading(false);
    
  };
  return (
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>ProfileScreen</Text>
      <Button onPress={handleLogOut} title='LogOut'/>
      <LoadingModal visible={isLoading}/>
    </View>
  )
}

export default ProfileScreen