import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector, AuthState, removeAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HandleNotification } from '../../utils/handleNotification'
import { LoadingModal } from '../../modals'
import { AvatarComponent, ButtonComponent, ContainerComponent, LoadingComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import userAPI from '../../apis/userApi'
import { ProfileModel } from '../../models/ProfileModel'
import { globalStyles } from '../../styles/globalStyle'
import AboutProfile from './components/AboutProfile'
import EditProfile from './components/EditProfile'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { appColors } from '../../constants/appColor'

const ProfileScreen = ({navigation,route}:any) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileModel>();
  const [userFollowers, setUserFollowers] = useState<string[]>([]);
  const [profileId, setProfileId] = useState('');

  const dispatch = useDispatch()
  const auth: AuthState = useSelector(authSelector);

  
  

  useEffect(() => {
    if(route.params){
      const {id} = route.params;
      setProfileId(id);

      if(route.params.isUpdated){
        getProfile();

        
      }
    }else{
      setProfileId(auth.id);
    }
  }, [route.params])

  useEffect(() => {
    if(profileId){
      getProfile();
      getFollowersByUid();
    }

  }, [profileId])

  const getProfile = async ()=>{
    const api = `/get-profile?uid=${profileId}`;
    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser(api);
     res && res.data && setProfile(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  const getFollowersByUid = async ()=>{
    const api = `/get-followers?uid=${profileId}`;
    try {
      const res = await userAPI.HandleUser(api);
      setUserFollowers(res.data);
    } catch (error) {
      console.log(error);
      
    }
  };
  // console.log(profile);
  
  return (
    <ContainerComponent back title={route.params ? '':'Profile'} right = {<ButtonComponent  icon = {<MaterialIcons name = 'more-vert' size={24} color={appColors.text} onPress={()=>{}}/>} />}>
      {isLoading ? <ActivityIndicator/> 
      : profile ? 
      <>
        <SectionComponent styles = {[globalStyles.center]}>
          <RowComponent >
              <AvatarComponent photoURL={profile.photoUrl} 
              name = {profile.name ? profile.name : profile.email}
              size={120}/>

          </RowComponent>
          <SpaceComponent height={16}/>
          <TextComponent text={profile.name 
            ? profile.name 
            : (profile.familyName && profile.givenName) 
            ? `${profile.familyName} ${profile.givenName}`
            : profile.email}  size={24}/>
          <SpaceComponent height={16}/>
          <RowComponent>
              <View style = {[globalStyles.center,{flex:1}]}>
                <TextComponent title text={`${profile.following.length}`} size={20}/>
                <SpaceComponent height={8}/>
                <TextComponent text='Following'/>
              </View>
              <View style = {{backgroundColor:appColors.gray2, width:1, height:'100%'}}/>
              <View style = {[globalStyles.center,{flex:1}]}>
                <TextComponent title text={`${userFollowers.length}`} size={20}/>
                <SpaceComponent height={8}/>
                <TextComponent text='Followers'/>
              </View>
          </RowComponent>
        </SectionComponent>
            {
              auth.id !== profileId ? <AboutProfile profile={profile}/> : <EditProfile profile={profile}/>
            }
      </>
      :<TextComponent text='profile not found!'/>}
    </ContainerComponent>
  )
}

export default ProfileScreen