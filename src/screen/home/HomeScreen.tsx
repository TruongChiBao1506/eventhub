import { View, Text, Button, StatusBar, SafeAreaView, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../styles/globalStyle';
import { appColors } from '../../constants/appColor';
import { CircleComponent, RowComponent, SpaceComponent, TagComponent, TextComponent } from '../../components';
import { ArrowDown, HambergerMenu, Notification, SearchNormal1, Sort } from 'iconsax-react-native';
import { fontFamilies } from '../../constants/fontFamilies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const auth = useSelector(authSelector);

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      <View style={{
        backgroundColor: appColors.primary,
        height: 179,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        padding: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        paddingHorizontal: 16,
      }}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <HambergerMenu size={24} color={appColors.white} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <RowComponent>
              <TextComponent text='Current location' color={appColors.white2} />
              <MaterialIcons name="arrow-drop-down" size={18} color={appColors.white} />
            </RowComponent>
            <TextComponent text='New York, USA' flex={0} color={appColors.white} font={fontFamilies.medium} />
          </View>
          <CircleComponent color='#524CE0' size={36}>
            <View>
              <Notification size={18} color={appColors.white} />
              <View style={{
                backgroundColor: '#02E9FE',
                width: 10, height: 10,
                borderRadius: 4,
                borderWidth: 2,
                position: 'absolute',
                borderColor: '#524CE0',
                top: -2,
                right: -2
              }}>

              </View>
            </View>

          </CircleComponent>
        </RowComponent>
        <SpaceComponent height={20} />
        <RowComponent>
          <RowComponent styles={{ flex: 1 }} onPress={() => navigation.navigate('SearchEvents', {
            isFilter: false,
          })
          }>
            <SearchNormal1 variant='TwoTone' size={20} color={appColors.white} />
            <View style={{
              width: 1,
              backgroundColor: appColors.gray2,
              marginHorizontal: 10,
              height: 20
            }} />
            <TextComponent flex={1} text='Search...' color={appColors.gray2} size={16} />
          </RowComponent>
          <TagComponent
            bgColor='#5D56F3'
            
            onPress={() => navigation.navigate('SearchEvents', {
              isFilter: true,
            })
            }
            label='Filters'
            icon={
              <CircleComponent size={20} color='#B1AEFA'>
                <Sort size={16} color='#5D56F3' />
              </CircleComponent>
            } />

        </RowComponent>
      </View>
      <View style={{
        flex: 1,
      }}>

      </View>
    </View>
    // <View style = {{flex: 1, justifyContent:'center', alignItems:'center'}}>
    //   <Text>Home Screen</Text>
    //   <Button
    //     title="LogOut"
    //     onPress={() => dispatch(removeAuth({}))}
    //   />
    // </View>
  )
}

export default HomeScreen