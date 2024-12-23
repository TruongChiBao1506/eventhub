import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { ProfileModel } from '../models/ProfileModel';
import userAPI from '../apis/userApi';
import SpaceComponent from './SpaceComponent';
import { fontFamilies } from '../constants/fontFamilies';
import { appColors } from '../constants/appColor';

interface Props {
    userId: string;
    type: 'Notification' | 'Invite';
    onPress: () => void;
}

const UserComponent = (props: Props) => {
    const { userId, type, onPress } = props;

    const [profile, setProfile] = useState<ProfileModel>();
    
    useEffect(() => {
        getProfile();
    }, [userId])

    const getProfile = async ()=>{
        const api = `/get-profile?uid=${userId}`;
        try {
          const res = await userAPI.HandleUser(api);
         res && res.data && setProfile(res.data);
        } catch (error) {
          console.log(error);
        }
      }

    return (
            profile && <RowComponent  onPress={onPress}>

                <Image source={{ uri: profile.photoUrl? profile.photoUrl: 'https://img.icons8.com/cute-clipart/64/user-male-circle.png' }}
                    style={{ width: 48, height: 48, borderRadius: 12, resizeMode: 'cover' }} />
                <SpaceComponent width={16} />
                <View style={{ flex: 1, height: 48, justifyContent: 'space-around' }}>
                    <TextComponent text={profile.name ? profile.name: profile?.email} font={fontFamilies.medium} size={16} />
                    <TextComponent text={profile.type ? profile.type : 'Personal'} color={appColors.gray} />
                </View>
            </RowComponent>
        
    )
}

export default UserComponent