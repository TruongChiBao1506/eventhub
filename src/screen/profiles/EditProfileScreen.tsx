import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProfileModel } from '../../models/ProfileModel'
import { AvatarComponent, ButtonComponent, ButtonImagePicker, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent } from '../../components';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage'
import { LoadingModal } from '../../modals';
import userAPI from '../../apis/userApi';

const EditProfileScreen = ({ navigation, route }: any) => {

    const { profile }: { profile: ProfileModel } = route.params;
    const [fileSelected, setFileSelected] = useState<any>();
    const [profileData, setProfileData] = useState<ProfileModel>(profile);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setProfileData(profile);
    },[])

    const handleChangeValue = (key: string, value: string | Date | string[] | Number) => {
        const items: any = { ...profileData }

        items[`${key}`] = value;

        setProfileData(items);
    }
    const onUpdateProfile = async () => {
        console.log(profileData);
        // const res = await userAPI.HandleUser('/get-all');
        // console.log(res);
        if (fileSelected) {
          const filename = `${fileSelected.filename ?? `image-${Date.now()}`}.${fileSelected.path.split('.')[1]}`;
          const path = `images/${filename}`;
          const res = storage().ref(path).putFile(fileSelected.path);
          res.on('state_changed', snapshot => {
            console.log(snapshot.bytesTransferred);
            
          }, error => {
            console.log(error);
            
          }, ()=>{
            storage().ref(path).getDownloadURL().then(url => {
                profileData.photoUrl = url;
              HandleUpdateProfile(profileData);
            })
          })
        }
        else {
            HandleUpdateProfile(profileData);
        }
      }
    const handleFileSelected = (val: ImageOrVideo) => {
        setFileSelected(val);
        handleChangeValue('photoUrl', val.path);
    }
    const HandleUpdateProfile = async (data:ProfileModel) => {
        const api = `/update-profile?uid=${profile.uid}`;

        const newData = {
            bio: data.bio ?? '', 
            familyName: data.familyName ?? '', 
            givenName: data.givenName ?? '', 
            name: data.name ?? '', 
            photoUrl: data.photoUrl ?? '', }
        setIsLoading(true);
        try {           
            const res:any = await userAPI.HandleUser(api, newData, 'put');
            setIsLoading(false);
            navigation.navigate('ProfileScreen', {
                isUpdated: true,
                id: profile.uid
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
        
    };
    return (
        <ContainerComponent back title={profile.name}>
            <SectionComponent>
                <RowComponent >
                    <AvatarComponent photoURL={profileData.photoUrl}
                        name={profileData.name ? profileData.name : profileData.email}
                        size={120} />
                </RowComponent>
                <SpaceComponent height={16} />
                <RowComponent>
                    <ButtonImagePicker onSelect={val =>
                        val.type === 'url' ?
                            handleChangeValue('photoUrl', val.value as string) :
                            handleFileSelected(val.value as ImageOrVideo)} />
                </RowComponent>

                <InputComponent 
                    allowClear
                    placeholder='Full name'
                    value={profileData.name}
                    onChange={val => handleChangeValue('name', val)} />
                <InputComponent 
                    allowClear
                    placeholder='Give name'
                    value={profileData.givenName}
                    onChange={val => handleChangeValue('givenName', val)} />
                <InputComponent 
                    allowClear
                    placeholder='Family name'
                    value={profileData.familyName}
                    onChange={val => handleChangeValue('familyName', val)} />
                <InputComponent 
                    allowClear
                    placeholder='Giới thiệu'
                    value={profileData.bio}
                    multiline
                    numberOfLines={5}
                    onChange={val => handleChangeValue('bio', val)} />
                <ButtonComponent 
                disable = {profileData === profile}
                text='Update' 
                onPress={onUpdateProfile}
                type='primary' />
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    )
}

export default EditProfileScreen

/**
 * EditProfileScreen component allows users to edit their profile information.
 * Users can update their name, given name, family name, bio, and profile picture.
 * The component handles image selection and uploads the new image to Firebase storage.
 * It also updates the user profile data through an API call.
 */