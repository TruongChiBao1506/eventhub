import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SelectModel } from '../models/SelectModel';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import { ArrowDown2, SearchNormal } from 'iconsax-react-native';
import { appColors } from '../constants/appColor';
import { globalStyles } from '../styles/globalStyle';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import SpaceComponent from './SpaceComponent';
import { fontFamilies } from '../constants/fontFamilies';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
    label?: string;
    values: SelectModel[];
    selected?: string | string[];
    onSelect: (val: string | string[]) => void;
    multiple?: boolean;
}

const DropdownPicker = (props: Props) => {
    const { label, values, selected, onSelect, multiple } = props;

    const [searchKey, setSearchKey] = useState('');
    const [isVisibleModalize, setIsVisibleModalize] = useState(false);
    const modalizeRef = useRef<Modalize>();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);



    useEffect(() => {
        if (isVisibleModalize) {
            modalizeRef.current?.open();
        }
    }, [isVisibleModalize]);

    useEffect(() => {
        if (isVisibleModalize && selected && selected.length > 0) {
            setSelectedItems(selected as string[]);
        }
    }, [isVisibleModalize, selected])

    const handleSelectItem = (id: string) => {
        if (selectedItems.includes(id)) {

            const data = [...selectedItems];
            const index = selectedItems.findIndex(item => item === id);
            if (index != -1) {
                data.splice(index, 1);
            }
            setSelectedItems(data);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    const renderSelectedItem = (id: string) => {
        const item = values.find(item => item.value === id);
        return item ? (
            <RowComponent key={id} styles={localStyles.selectedItem}>
                <TextComponent text={`${item.label.includes('@') ? item.label.split('@')[0]: item.label}`} color={appColors.primary} />
                <SpaceComponent width={8} />
                <TouchableOpacity onPress={() => { 
                    
                    handleSelectItem(id)
                    onSelect(selectedItems) }}>
                    <AntDesign name='close' size={18} color={appColors.gray} />
                </TouchableOpacity>
            </RowComponent>
        ):(<></>)
    }
    const renderSelectItem = (item: SelectModel) => {
        return <RowComponent onPress={multiple ? () => { handleSelectItem(item.value) } : () => onSelect(item.value)} key={item.value} styles={localStyles.listItem}>
            <TextComponent
                text={item.label}
                styles={{ flex: 1 }}
                font={selectedItems?.includes(item.value) ? fontFamilies.medium : fontFamilies.regular}
                color={selectedItems?.includes(item.value) ? appColors.primary : appColors.text} />
            <MaterialCommunityIcons name={selectedItems?.includes(item.value) ? 'checkbox-marked-circle-outline' : ''} size={22} color={appColors.primary} />
        </RowComponent>
    }

    return (
        <View style={{ marginBottom: 8 }}>
            {label && <TextComponent text={label} styles={{ marginBottom: 8 }} />}
            <RowComponent styles={[globalStyles.inputContainer,{alignItems:'flex-start'}]} onPress={() => setIsVisibleModalize(true)}>
                <RowComponent styles={{ flex: 1, flexWrap: 'wrap' }}>

                    {selectedItems.length > 0 ? (selectedItems.map(item =>
                        renderSelectedItem(item)
                    )) : <TextComponent text="Select" />}

                </RowComponent>
                <ArrowDown2 size={22} color={appColors.gray} />
            </RowComponent>
            <Portal>
                <Modalize
                    FooterComponent={
                        multiple && <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
                            <ButtonComponent type='primary' text='Agree' onPress={() => {
                                onSelect(selectedItems)
                                modalizeRef.current?.close();
                            }} />
                        </View>
                    }
                    handlePosition='inside'
                    scrollViewProps={{ showsVerticalScrollIndicator: false }}
                    HeaderComponent={
                        <RowComponent styles={{ marginBottom: 12, paddingHorizontal: 20, paddingTop: 30 }}>
                            <View style={{ flex: 1 }}>
                                <InputComponent
                                    allowClear
                                    affix={<SearchNormal size={22} color={appColors.text} />}
                                    styles={{ marginBottom: 0 }}
                                    placeholder='Search...' value={searchKey}
                                    onChange={val => setSearchKey(val)} />
                            </View>
                            <SpaceComponent width={20} />
                            <ButtonComponent type='link' text='Cancel' onPress={() => modalizeRef.current?.close()} />
                        </RowComponent>
                    }
                    ref={modalizeRef} onClose={() => setIsVisibleModalize(false)}>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
                        {values.map(item => renderSelectItem(item))}
                    </View>
                </Modalize>
            </Portal>
        </View>
    )
}

export default DropdownPicker


const localStyles = StyleSheet.create({
    listItem: {
        marginBottom: 20
    },
    selectedItem: {
        borderWidth: 0.5,
        borderColor: appColors.gray,
        padding: 4,
        marginBottom: 8,
        marginRight: 8,
        borderRadius: 8,
    }
})