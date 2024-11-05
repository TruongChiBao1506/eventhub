import { View, Text, Platform } from 'react-native'
import React, { ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AddNewScreen, HomeScreen } from '../screen';
import ExploreNavigator from './ExploreNavigator';
import EventsNavigator from './EventsNavigator';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';
import { appColors } from '../constants/appColor';
import { AddSquare, Calendar, Location, User } from 'iconsax-react-native';
import { CircleComponent, TextComponent } from '../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../styles/globalStyle';
import DrawerNavigator from './DrawerNavigator';


const TabNavigator = () => {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={({route})=>({headerShown:false,
      tabBarStyle:{
        height: Platform.OS === 'ios'? 88: 74,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: appColors.white,
      },
      tabBarIcon:({focused, color, size })=>{
        let icon: ReactNode;
        color = focused ? appColors.primary : appColors.gray5;
        size = 24;
        switch(route.name){
          case 'Explore':
            icon = <MaterialIcons name = "explore" size = {size} color={color}/>
            break;
          case 'Events':
            icon = <Calendar variant='Bold' size = {size} color={color}/>
            break;
            case 'Map':
              icon = <Location variant='Bold' size = {size} color={color}/>
              break;
            case 'Profile':
              icon = <User variant='Bold' size = {size} color={color}/>
              break;
            case 'Add':
              icon = (
                <CircleComponent size={52} styles = {{marginTop:Platform.OS === 'ios'? -50:-60}}>
                  <AddSquare size={24} color={appColors.white} variant='Bold' />
                </CircleComponent>
                )
              break;
        }
        return icon;
      },
      tabBarIconStyle:{
        marginBottom:0,
        marginTop:8
      },

      tabBarLabel({focused}){
        return route.name === 'Add' ? null : <TextComponent text={route.name} flex={0} size={12}  
        color={focused ? appColors.primary : appColors.gray}
        styles = {{marginBottom: Platform.OS === 'android'?12:0}}/>
      },
    
    })}>
        <Tab.Screen name = "Explore" component={ExploreNavigator}/>
        <Tab.Screen name = "Events" component={EventsNavigator}/>
        <Tab.Screen name = "Add" component={AddNewScreen} 
        />
        <Tab.Screen name = "Map" component={MapNavigator}/>
        <Tab.Screen name = "Profile" component={ProfileNavigator}/>
    </Tab.Navigator>
  )
}

export default TabNavigator