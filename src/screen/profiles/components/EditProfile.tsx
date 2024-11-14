import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TagComponent, TextComponent } from '../../../components'
import { ProfileModel } from '../../../models/ProfileModel'
import { useNavigation } from '@react-navigation/native'
import { appColors } from '../../../constants/appColor'

interface Props {
    profile: ProfileModel;
    onUpdateFinish?:()=>void;
}

const EditProfile = (props: Props) => {
    const { profile, onUpdateFinish } = props;

    const navigation:any = useNavigation();

    

    return (
        <SectionComponent>
            <RowComponent>
                <ButtonComponent styles = {{borderWidth:1, borderColor:appColors.primary, backgroundColor: appColors.white}} text='Edit profile' onPress={() => navigation.navigate('EditProfileScreen',{
                    profile
                })} 
                textColor={appColors.primary}
                type='primary' />
            </RowComponent>
            <SpaceComponent height={20}/>
            <TextComponent text='About' title size={18} />
            <TextComponent text={profile.bio} />
            <SpaceComponent height={20}/>
            <>
                <RowComponent>
                    <TextComponent flex={1} text='Interests' title size={18} />
                    <ButtonComponent text='change' />

                </RowComponent>
                <RowComponent styles = {{flexWrap:'wrap', justifyContent:'flex-start'}}>
                    {Array.from({length:10}).map((item,index)=>
                    <TagComponent 
                    bgColor='#e0e0e0'
                    key={`tag${index}`} 
                    label='Music' 
                    onPress={()=>{}}
                    styles={{marginRight:8,marginBottom:12}}
                    />)}
                    
                </RowComponent>
            </>

        </SectionComponent>
    )
}

export default EditProfile