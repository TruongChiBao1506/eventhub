import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TagComponent, TextComponent } from '../../../components'
import { ProfileModel } from '../../../models/ProfileModel'
import { useNavigation } from '@react-navigation/native'
import { appColors } from '../../../constants/appColor'
import { globalStyles } from '../../../styles/globalStyle'
import { Edit2 } from 'iconsax-react-native'
import ModalSelectCategories from '../../../modals/ModalSelectCategories'
import { Category } from '../../../models/Category'
import eventAPI from '../../../apis/eventApi'

interface Props {
    profile: ProfileModel;
    onUpdateFinish?: () => void;
}

const EditProfile = (props: Props) => {


    const { profile, onUpdateFinish } = props;
    const [isVisibleModalCategory, setIsVisibleModalCategory] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const navigation: any = useNavigation();

    useEffect(() => {
        getCategories();
    }, []);
    const getCategories = async () => {
        const api = `/get-categories`;
        try {
            const res:any = await eventAPI.HandleEvent(api);
            setCategories(res.data);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <SectionComponent>
            <RowComponent>
                <ButtonComponent styles={{ borderWidth: 1, borderColor: appColors.primary, backgroundColor: appColors.white }} text='Edit profile' onPress={() => navigation.navigate('EditProfileScreen', {
                    profile
                })}
                    textColor={appColors.primary}
                    type='primary' />
            </RowComponent>
            <SpaceComponent height={20} />
            <TextComponent text='About' title size={18} />
            <TextComponent text={profile.bio} />
            <SpaceComponent height={20} />
            <>
                <RowComponent >
                    <TextComponent flex={1} text='Interests' title size={18} />
                    <RowComponent styles = {[globalStyles.tag, {backgroundColor:'#5C69D020'}]} onPress={()=> setIsVisibleModalCategory(true)}>
                        <Edit2 size={18} color={appColors.text}/>
                        <SpaceComponent width={8} />
                        <TextComponent color={appColors.primary} text='Change' size={14}/>
                    </RowComponent>
                    {/* <ButtonComponent styles={[globalStyles.tag, {
                        backgroundColor: appColors.primary, marginBottom: 0, margin: 0, paddingHorizontal:12
                    }]} type='primary' text='change' /> */}

                </RowComponent>
                <RowComponent styles={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {categories.length > 0 && profile.interests && categories.map(item=> profile.interests.includes(item._id) &&
                    <View key={item._id} style = {[globalStyles.tag, {backgroundColor:item.color, margin: 6}]}>
                        <TextComponent text={item.title} color={appColors.white}/>
                    </View>)}

                </RowComponent>
            </>
            <ModalSelectCategories categories={categories}
            selected={profile.interests}
            onSelected={val => {
                setIsVisibleModalCategory(false)
                navigation.navigate('ProfileScreen', {
                    isUpdated: true,
                    id: profile.uid
                });
            }}
            onClose={() => setIsVisibleModalCategory(false)}
            visible={isVisibleModalCategory}
            />
        </SectionComponent>
    )
}

export default EditProfile