import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import Feather from 'react-native-vector-icons/Feather'
import { appColors } from '../../../constants/appColor'
import { globalStyles } from '../../../styles/globalStyle'
import { fontFamilies } from '../../../constants/fontFamilies'
import Ionicons from 'react-native-vector-icons/Ionicons'
const AboutProfile = () => {
  return (
    <>
      <SectionComponent>
        <RowComponent>
          {/* <ButtonComponent iconFlex='left' styles = {{width:'auto'}} icon = {<Feather name = 'user-plus' size={20} color={appColors.white}/>} text='Follow' type='primary'/>
          <SpaceComponent height={20}/>
          <ButtonComponent iconFlex='left' styles = {{width:'auto'}} icon = {<Feather name = 'user-plus' size={20} color={appColors.white}/>} text='Follow' type='link'/> */}
          <TouchableOpacity style = {[globalStyles.button,{flex:1,backgroundColor:appColors.primary}]}>
            <Feather name = 'user-plus' size={20} color={appColors.white}/>
            <SpaceComponent width={12}/>
            <TextComponent text='Follow' color={appColors.white} font={fontFamilies.medium}/>
          </TouchableOpacity>
            <SpaceComponent width={20}/>
          <TouchableOpacity style = {[globalStyles.button,{flex:1, borderWidth:1,borderColor:appColors.primary}]}>
            <Ionicons name = 'chatbubble-outline' size={20} color={appColors.primary}/>
            <SpaceComponent width={12}/>
            <TextComponent text='Message' color={appColors.primary} font={fontFamilies.medium}/>
          </TouchableOpacity>
        </RowComponent> 
      </SectionComponent>
    </>
  )
}

export default AboutProfile