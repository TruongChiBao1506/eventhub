import { View, Text } from 'react-native'
import React from 'react'
import { EditProfileScreen, ProfileScreen } from '../screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ProfileNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator