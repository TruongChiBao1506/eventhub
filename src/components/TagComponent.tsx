import { View, Text, Touchable, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React, { ReactNode } from 'react'
import TextComponent from './TextComponent';
import { globalStyles } from '../styles/globalStyle';
import { appColors } from '../constants/appColor';

interface Props{
    onPress: () => void;
    label: string;
    icon?: ReactNode;
    textColor?: string;
    bgColor?: string;
    styles?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const TagComponent = (props: Props) => {

    const {onPress, label, icon, textColor, bgColor, styles,textStyle} = props;
  return (
    <TouchableOpacity style = {[globalStyles.row, globalStyles.tag,{
        backgroundColor: bgColor ? bgColor: appColors.white ,
        
    }, styles]} onPress={onPress}>
        {icon && icon}
        <TextComponent text={label} 
        styles = {[{marginLeft: icon ? 8:0}, textStyle]}
        color={textColor ? textColor : bgColor ? appColors.white : appColors.gray}/>
    </TouchableOpacity>
  )
}

export default TagComponent