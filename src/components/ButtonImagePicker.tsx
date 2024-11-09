import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { ReactNode, useRef, useState } from 'react'
import ButtonComponent from './ButtonComponent'
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import TextComponent from './TextComponent';
import { Camera, Image, Link } from 'iconsax-react-native';
import { appColors } from '../constants/appColor';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import { fontFamilies } from '../constants/fontFamilies';
import ImageCropPicker, { ImageOrVideo, Options } from 'react-native-image-crop-picker';
import { globalStyles } from '../styles/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputComponent from './InputComponent';

interface Props {
    onSelect: (val: {
        type: 'url'|'file',
        value: string | ImageOrVideo
    })=> void
}


const ButtonImagePicker = (props: Props) => {

    const {onSelect} = props;

    const modalizeRef = useRef<Modalize>();

    const [imageUrl, setImageUrl] = useState('');
    const [isVisibleModalAddUrl, setIsVibleModalAddUrl] = useState(false);

    const options: Options = {
        cropping: true, 
        mediaType:'photo' 
    }

    const choiceImage = [
        {
            key: 'camera',
            title: 'Take a photo',
            icon: <Camera size={22} color={appColors.text} />
        },
        {
            key: 'library',
            title: 'From library',
            icon: <Image size={22} color={appColors.text} />
        },
        {
            key: 'url',
            title: 'From url',
            icon: <Link size={22} color={appColors.text} />
        },
    ]
    const renderItem = (item: { icon: ReactNode, key: string, title: string }) => {
        return (
            <RowComponent key={item.key} styles={{ marginBottom: 20 }} onPress={() => handleChoiceImage(item.key)}>
                {item.icon}
                <SpaceComponent width={12} />
                <TextComponent text={item.title} flex={1} font={fontFamilies.medium} />
            </RowComponent>
        )
    };

    const handleChoiceImage = (key: string) => {
        switch (key) {
            case 'camera':
                ImageCropPicker.openCamera(options).then(res => {
                    onSelect({type: 'file', value: res});
                });
                break;
            case 'library':
                ImageCropPicker.openPicker(options).then(res => {
                    onSelect({type: 'file', value: res});
                });
                break;
            default:
                setIsVibleModalAddUrl(true);
                break;
        }
        modalizeRef.current?.close();
    };

    return (
        <View style={{ marginBottom: 20 }}>
            <ButtonComponent text='Upload image' onPress={() => modalizeRef.current?.open()} type='link' />
            <Portal>
                <Modalize adjustToContentHeight ref={modalizeRef} handlePosition='inside'>
                    <View style={{ marginVertical: 30, paddingHorizontal: 20 }}>
                        {
                            choiceImage.map(item => renderItem(item))
                        }
                    </View>
                </Modalize>
            </Portal>
            <Modal visible={isVisibleModalAddUrl}
                statusBarTranslucent
                style={{ flex: 1 }} transparent animationType='slide' >
                <View style={[globalStyles.container, {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }]}>
                    <View style={{
                        backgroundColor: appColors.white,
                        margin: 20,
                        borderRadius: 12,
                        width: '90%',
                        padding: 20,
                    }}>
                        <RowComponent justify='flex-end'>
                            <TouchableOpacity onPress={() => {
                                setImageUrl('');
                                setIsVibleModalAddUrl(false);

                            }}>
                                <AntDesign name='close' size={24} color={appColors.text} />
                            </TouchableOpacity>
                        </RowComponent>
                        <TextComponent text='Image URL' title size={18} />
                        <InputComponent 
                        multiline
                        numberOfLines={3}
                        placeholder='URL' 
                        value = {imageUrl} 
                        onChange={val => setImageUrl(val)}
                        allowClear
                        />
                        <RowComponent justify='flex-end'>
                            <ButtonComponent 
                            type = 'link'
                            text='Agress' 
                            onPress={()=>{

                                setIsVibleModalAddUrl(false);
                                onSelect({type: 'url', value: imageUrl})
                                setImageUrl('');
                            }}/>
                        </RowComponent>
                    </View>

                </View>
            </Modal>
        </View>
    )
}

export default ButtonImagePicker