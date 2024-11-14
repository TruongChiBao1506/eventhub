import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import Feather from 'react-native-vector-icons/Feather'
import { appColors } from '../../../constants/appColor'
import { globalStyles } from '../../../styles/globalStyle'
import { fontFamilies } from '../../../constants/fontFamilies'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, updateFollowing } from '../../../redux/reducers/authReducer'
import { ProfileModel } from '../../../models/ProfileModel'
import userAPI from '../../../apis/userApi'
import { LoadingModal } from '../../../modals'


interface Props {

  profile: ProfileModel;
}

const AboutProfile = (props: Props) => {
  const { profile } = props;
  const [tabSelected, setTabSelected] = useState('about');
  
  const [isLoading, setIsLoading] = useState(false);
  const tabs = [
    {
      key: 'about',
      title: 'About',
    },
    {
      key: 'events',
      title: 'Events',
    },
    {
      key: 'reviews',
      title: 'Reviews',
    },
  ]

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const renderTabContent = (id: string) => {
    let content = <></>;

    switch (id) {
      case 'about':
        content = (
          <>
            <TextComponent text={profile.bio} />
          </>
        );
        break;

      default:
        content = <></>;
        break;
    }
    return content;
  };

  const handleToggleFolloing = async()=>{
    const api = `/update-following`;
    setIsLoading(true);
    try {
        const res = await userAPI.HandleUser(api, {
          uid: auth.id,
          authorId: profile.uid,
        },'put');
        dispatch(updateFollowing(res.data));
        setIsLoading(false);
    } catch (error) {
        console.log(error);
        setIsLoading(false);
    }
  }

  return (
    <>
      <SectionComponent>
        <RowComponent>
          {/* <ButtonComponent iconFlex='left' styles = {{width:'auto'}} icon = {<Feather name = 'user-plus' size={20} color={appColors.white}/>} text='Follow' type='primary'/>
          <SpaceComponent height={20}/>
          <ButtonComponent iconFlex='left' styles = {{width:'auto'}} icon = {<Feather name = 'user-plus' size={20} color={appColors.white}/>} text='Follow' type='link'/> */}
          <TouchableOpacity style={[globalStyles.button, { flex: 1, backgroundColor: appColors.primary }]} onPress={handleToggleFolloing}>
            <Feather name={auth.following && auth.following.includes(profile.uid) ? 'user-minus': 'user-plus'} size={20} color={appColors.white} />
            <SpaceComponent width={12} />
            <TextComponent text={auth.following && auth.following.includes(profile.uid)?'Unfollow':'Follow'} color={appColors.white} font={fontFamilies.medium} />
          </TouchableOpacity>
          <SpaceComponent width={20} />
          <TouchableOpacity style={[globalStyles.button, { flex: 1, borderWidth: 1, borderColor: appColors.primary }]}>
            <Ionicons name='chatbubble-outline' size={20} color={appColors.primary} />
            <SpaceComponent width={12} />
            <TextComponent text='Message' color={appColors.primary} font={fontFamilies.medium} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent>
          {tabs.map(item => (
            <TouchableOpacity
              onPress={() => setTabSelected(item.key)}
              key={item.key} style={[globalStyles.center, {
                flex: 1,
              }]}>
              <TextComponent text={item.title} font={item.key === tabSelected ? fontFamilies.medium : fontFamilies.regular}
                color={item.key === tabSelected ? appColors.primary : appColors.text}
                size={16} />
                <View style = {{width:80, 
                borderRadius:100, 
                height:3, 
                marginTop:6,
                flex:0,
                backgroundColor:item.key === tabSelected? appColors.primary:appColors.white}}/>
            </TouchableOpacity>
          ))}



        </RowComponent>
        {renderTabContent(tabSelected)}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </>
  )
}

export default AboutProfile