
import React from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';
import {appInfo} from '../constants/appInfos';
import SpaceComponent from '../components/SpaceComponent';
import { appColors } from '../constants/appColor';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/splash-img.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{flex: 1}}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{
          width: appInfo.sizes.WIDTH * 0.7,
          resizeMode: 'contain',
        }}
      />
      <SpaceComponent height={16} />
      <ActivityIndicator color={appColors.gray} size={22} />
    </ImageBackground>
  );
};

export default SplashScreen;
// import { View, Text } from 'react-native'
// import React from 'react'

// const SplashScreen = () => {
//   return (
//     <View>
//       <Text>SplashScreen</Text>
//     </View>
//   )
// }

// export default SplashScreen