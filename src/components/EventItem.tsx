
import {View, Text, Dimensions, ImageBackground} from 'react-native';
import React from 'react';
import {AvatarGroup, CardComponent, RowComponent, SpaceComponent, TextComponent} from '.';
import { EventModel } from '../models/EventModel';
import { Bookmark2, Location } from 'iconsax-react-native';
import { appColors } from '../constants/appColor';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  item: EventModel;
  type: 'list' | 'card';
  onPress?: () => void;
}

const EventItem = (props: Props) => {
  const {item, type, onPress} = props;

  console.log(item);
  
  return type === 'card' ? (
    <CardComponent 
    isShadow 
    styles={{width: Dimensions.get('window').width * 0.7}}
    onPress={()=>{}}>
      <ImageBackground style= {{flex:1, marginBottom:12, height:131, padding:10}} 
      source={require('../assets/images/event-image.png')} 
      imageStyle = {{padding:10, resizeMode:'cover', borderRadius:12}}>
        <RowComponent justify='space-between'>
            <CardComponent styles = {globalStyles.noSpaceCard} color='#ffffffB3'>
              <TextComponent color={appColors.danger2} font={fontFamilies.bold} size={14} text='10'/>
              <TextComponent color={appColors.danger2} font={fontFamilies.semiBold} size={10} text='JUNE'/>
            </CardComponent>
            <CardComponent styles = {globalStyles.noSpaceCard} color='#ffffffB3'>
              <MaterialIcons name = 'bookmark' size={22} color={appColors.danger2}/>
            </CardComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent
        numberOfLine={1}
        title
        size={18}
        text={item.title}
      />
      <AvatarGroup/>
      <RowComponent>
        <Location size={18} color={appColors.text3} variant='Bold' />
        <SpaceComponent width={8}/>
        <TextComponent 
        text={item.location.address} 
        size={12} 
        color={appColors.text3}
        flex={1}
        numberOfLine={1}/>
      </RowComponent>
    </CardComponent>
  ) : (
    <></>
  );
};

export default EventItem;
