// // import { View, Text, Button, StatusBar, SafeAreaView, TouchableOpacity, Platform } from 'react-native'
// // import React from 'react'
// // import { useDispatch, useSelector } from 'react-redux';
// // import { authSelector, removeAuth } from '../../redux/reducers/authReducer';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { globalStyles } from '../../styles/globalStyle';
// // import { appColors } from '../../constants/appColor';
// // import { CategoriesList, CircleComponent, RowComponent, SpaceComponent, TagComponent, TextComponent } from '../../components';
// // import { ArrowDown, HambergerMenu, Notification, SearchNormal1, Sort } from 'iconsax-react-native';
// // import { fontFamilies } from '../../constants/fontFamilies';
// // import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// // const HomeScreen = ({ navigation }: any) => {
// //   const dispatch = useDispatch();

// //   const auth = useSelector(authSelector);

// //   return (
// //     <View style={[globalStyles.container]}>
// //       <StatusBar barStyle={'light-content'} />
// //       <View style={{
// //         backgroundColor: appColors.primary,
// //         height: 179,
// //         borderBottomLeftRadius: 40,
// //         borderBottomRightRadius: 40,
// //         paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
// //         paddingHorizontal: 16,
// //       }}>
// //         <RowComponent>
// //           <TouchableOpacity onPress={() => navigation.openDrawer()}>
// //             <HambergerMenu size={24} color={appColors.white} />
// //           </TouchableOpacity>
// //           <View style={{ flex: 1, alignItems: 'center' }}>
// //             <RowComponent>
// //               <TextComponent text='Current location' color={appColors.white2} />
// //               <MaterialIcons name="arrow-drop-down" size={18} color={appColors.white} />
// //             </RowComponent>
// //             <TextComponent text='New York, USA' flex={0} color={appColors.white} font={fontFamilies.medium} />
// //           </View>
// //           <CircleComponent color='#524CE0' size={36}>
// //             <View>
// //               <Notification size={18} color={appColors.white} />
// //               <View style={{
// //                 backgroundColor: '#02E9FE',
// //                 width: 10, height: 10,
// //                 borderRadius: 4,
// //                 borderWidth: 2,
// //                 position: 'absolute',
// //                 borderColor: '#524CE0',
// //                 top: -2,
// //                 right: -2
// //               }}>

// //               </View>
// //             </View>

// //           </CircleComponent>
// //         </RowComponent>
// //         <SpaceComponent height={20} />
// //         <RowComponent>
// //           <RowComponent styles={{ flex: 1 }} onPress={() => navigation.navigate('SearchEvents', {
// //             isFilter: false,
// //           })
// //           }>
// //             <SearchNormal1 variant='TwoTone' size={20} color={appColors.white} />
// //             <View style={{
// //               width: 1,
// //               backgroundColor: appColors.gray2,
// //               marginHorizontal: 10,
// //               height: 20
// //             }} />
// //             <TextComponent flex={1} text='Search...' color={appColors.gray2} size={16} />
// //           </RowComponent>
// //           <TagComponent
// //             bgColor='#5D56F3'

// //             onPress={() => navigation.navigate('SearchEvents', {
// //               isFilter: true,
// //             })
// //             }
// //             label='Filters'
// //             icon={
// //               <CircleComponent size={20} color='#B1AEFA'>
// //                 <Sort size={16} color='#5D56F3' />
// //               </CircleComponent>
// //             } />

// //         </RowComponent>
// //         <SpaceComponent height={20} />
// //         <View style={{ bottom: -20, position: 'absolute' }}>
// //           <CategoriesList isColor />
// //         </View>

// //       </View>

// //       <View style={{
// //         flex: 1,
// //       }}>

// //       </View>
// //     </View>
// //     // <View style = {{flex: 1, justifyContent:'center', alignItems:'center'}}>
// //     //   <Text>Home Screen</Text>
// //     //   <Button
// //     //     title="LogOut"
// //     //     onPress={() => dispatch(removeAuth({}))}
// //     //   />
// //     // </View>
// //   )
// // }

// // export default HomeScreen
// // 
// import GeoLocation from '@react-native-community/geolocation';
import axios from 'axios';
import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  CategoriesList,
  CircleComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components';


import { globalStyles } from '../../styles/globalStyle';
import { appColors } from '../../constants/appColor';
import { fontFamilies } from '../../constants/fontFamilies';
import { AddressModel } from '../../models/AddressModel';

const HomeScreen = ({navigation}: any) => {
  const [addressInfo, setAddressInfo] = useState<AddressModel>();

  // useEffect(() => {
  //   handleGetCurrentLocation();
  // }, []);

  const itemEvent = {
    title: 'International Band Music Concert',
    description:
      'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK',
    },
    imageUrl: '',
    user: [''],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  };

  // const handleGetCurrentLocation = async () => {
  //   GeoLocation.getCurrentPosition(position => {
  //     if (position && position.coords) {
  //       handleResertGeocode({
  //         lat: position.coords.latitude,
  //         long: position.coords.longitude,
  //       });
  //     }
  //   });
  // };

  // const handleResertGeocode = async ({
  //   lat,
  //   long,
  // }: {
  //   lat: number;
  //   long: number;
  // }) => {
  //   const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=en-US&apiKey=EoGZAqvCk9NFBvK6Trb_9iudji1DWPy1QfnsJN0GRlo`;
  //   await axios
  //     .get(api)
  //     .then(res => {
  //       if (res && res.status === 200 && res.data) {
  //         const items = res.data.items;

  //         items.length > 0 && setAddressInfo(items[0]);
  //       }
  //     })
  //     .catch(e => {
  //       console.log('Error in getAddressFromCoordinates', e);
  //     });
  // };

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          backgroundColor: appColors.primary,
          height: Platform.OS === 'android' ? 166 : 182,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}>
        <View style={{paddingHorizontal: 16}}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={[{flex: 1, alignItems: 'center'}]}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
              {addressInfo && (
                <TextComponent
                  text={`${addressInfo.address.city}, ${addressInfo.address.countryCode}`}
                  flex={0}
                  color={appColors.white}
                  font={fontFamilies.medium}
                  size={13}
                />
              )}
            </View>

            <CircleComponent color="#524CE0" size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}
                />
              </View>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={20} />
          <RowComponent>
            <RowComponent
              styles={{flex: 1}}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: false,
                })
              }>
              <SearchNormal1
                variant="TwoTone"
                color={appColors.white}
                size={20}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.gray2,
                  marginHorizontal: 10,
                  height: 20,
                }}
              />
              <TextComponent
                flex={1}
                text="Search..."
                color={appColors.gray2}
                size={16}
              />
            </RowComponent>
            <TagComponent
              bgColor={'#5D56F3'}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: true,
                })
              }
              label="Filters"
              icon={
                <CircleComponent size={20} color="#B1AEFA">
                  <Sort size={16} color="#5D56F3" />
                </CircleComponent>
              }
            />
          </RowComponent>
          <SpaceComponent height={20} />
        </View>
        <View style={{marginBottom: -16}}>
          <CategoriesList isFill />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 22 : 18,
          },
        ]}>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 24}}>
          <TabBarComponent title="Upcoming Events" onPress={() => {}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>
        <SectionComponent>
          <ImageBackground
            source={require('../../assets/images/invite-image.png')}
            style={{flex: 1, padding: 16, minHeight: 127}}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
            }}>
            <TextComponent text="Invite your friends" title />
            <TextComponent text="Get $20 for ticket" />

            <RowComponent justify="flex-start">
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    marginTop: 12,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 28,
                  },
                ]}>
                <TextComponent
                  text="INVITE"
                  font={fontFamilies.bold}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 24}}>
          <TabBarComponent title="Nearby You" onPress={() => {}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
// import { View, Text } from 'react-native'
// import React from 'react'

// const HomeScreen = () => {
//   return (
//     <View>
//       <Text>HomeScreen</Text>
//     </View>
//   )
// }

// export default HomeScreen