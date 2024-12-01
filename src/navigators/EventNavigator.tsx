import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventsScreen } from '../screen';
import ExploreEvents from '../screen/events/ExploreEvents';

const EventsNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="EventsScreen" component={EventsScreen} />
            <Stack.Screen name="ExploreEvents" component={ExploreEvents} />
        </Stack.Navigator>
    )
}

export default EventsNavigator