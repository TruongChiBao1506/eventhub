import { View, Text, TouchableOpacity, Share, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { appColors } from '../constants/appColor';
import { Category } from '../models/Category';
import { KnifeFork } from '../assets/svgs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, TextComponent, UserComponent } from '../components';
import eventAPI from '../apis/eventApi';
import { globalStyles } from '../styles/globalStyle';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import userAPI from '../apis/userApi';
import { fontFamilies } from '../constants/fontFamilies';
import { SearchNormal, TickCircle } from 'iconsax-react-native';

interface Props {
    visible: boolean;
    onClose: () => void;

}

const ModalInvite = (props: Props) => {
    const { visible, onClose} = props;
    const [friendIds, setFriendIds] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState<string[]>([]);
    const [userSelected, setUserSelected] = useState<string[]>([]);
    const modalizeRef = useRef<Modalize>();
    const auth = useSelector(authSelector);

    useEffect(() => {
        if (auth.following && auth.following.length > 0) {
            setFriendIds(auth.following);
        }
    }, [auth]);

    useEffect(() => {
        if (visible) {
            modalizeRef.current?.open();
        }
        else {
            modalizeRef.current?.close();
        }
    }, [visible]);


    const handleSelectedId = (id: string) => {
        const items: string[] = [...userSelected];
        const index = items.findIndex(item => item === id);

        if (index !== -1) {
            items.splice(index, 1);
        } else {
            items.push(id);
        }
        setUserSelected(items);
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {

                } else {

                }
            } else if (result.action === Share.dismissedAction) {

            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    }

    const handleSendInviteNotification = async () => {
        console.log(userSelected);
        
        if (userSelected.length > 0) {
            const api = `/send-invite`;
            try {
                await userAPI.HandleUser(api, {
                    ids: userSelected
                }, 'post');

            } catch (error) {
                console.log(error);

            }
        } else {
            Alert.alert('', 'Please select user want to invite!!');
        }

    };

    return (
        <Portal>
            <Modalize
                handlePosition='inside'
                adjustToContentHeight
                ref={modalizeRef}
                onClose={onClose}
                FooterComponent={
                    <SectionComponent>
                        <ButtonComponent text='Invite' onPress={() => {
                            onShare();
                            handleSendInviteNotification();
                        }} type='primary' />
                    </SectionComponent>
                }
            >
                <SectionComponent styles={{ paddingTop: 30 }}>
                    <TextComponent title text='Invite Friend' size={24} font={fontFamilies.medium} />

                    <InputComponent
                        styles={{ marginTop: 12, marginBottom: 24 }}
                        suffix={<SearchNormal size={20} color={appColors.primary} />}
                        placeholder='Seacrh' value='' onChange={val => console.log(val)} />

                    {friendIds.length ? friendIds.map((id: string) =>
                        <RowComponent key={id}>
                            <View style={{ flex: 1 }}>
                                <UserComponent

                                    type='Invite'
                                    onPress={() => handleSelectedId(id)}
                                    userId={id} />
                            </View>
                            <TickCircle variant='Bold' size={24} color={userSelected.includes(id) ? appColors.primary : appColors.gray2} />
                        </RowComponent>
                    )
                        : <TextComponent text='No friends' />}

                </SectionComponent>
            </Modalize>
        </Portal>
    )
}

export default ModalInvite