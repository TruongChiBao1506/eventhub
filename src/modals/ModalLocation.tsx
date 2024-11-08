import { View, Text, Modal, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appColors } from '../constants/appColor';
import { SearchNormal1 } from 'iconsax-react-native';
import axios from 'axios';
import { LocationModel } from '../models/LocationModel';

interface Props {
    visible: boolean;
    onClose: () => void;
    onSelect: (val: string) => void

}

const ModalLocation = (props: Props) => {
    const { visible, onClose, onSelect } = props;
    const [searchKey, setSearchKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState<LocationModel[]>([]);
    const [addressSelected, setAddressSelected] = useState('');
    const APIKey = 'pk.4c554ed3b1014f0b4a503760d05d032c';

    useEffect(() => {
        if (!searchKey) {
            setLocations([]);
        }
    }, [searchKey])

    const hanleClose = () => {
        onClose();
    }

    const handleSearchLocation = async () => {
        const encodeSearchKey = encodeURIComponent(searchKey);
        console.log(encodeSearchKey);

        const api = `https://us1.locationiq.com/v1/search?key=${APIKey}&q=${encodeSearchKey}&format=json&`;
        console.log(api);
        try {
            setIsLoading(true);
            const res = await axios.get(api);
            if (res && res.data && res.status === 200) {
                setLocations(res.data);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Modal animationType='slide' visible={visible} style={{ flex: 1 }}>
            <View style={{ paddingVertical: 42, paddingHorizontal: 20 }}>
                <RowComponent justify='flex-end' styles={{ marginVertical: 20 }}>
                    <View style={{ flex: 1 }}>
                        <InputComponent
                            styles={{ marginBottom: 0 }}
                            affix={<SearchNormal1 size={20} color={appColors.gray} />}
                            placeholder='Search'
                            allowClear
                            value={searchKey}
                            onChange={val => setSearchKey(val)}
                            onEnd={handleSearchLocation} />

                    </View>
                    <View style={{ position: 'absolute', top: 56, right: 10, left: 10, backgroundColor: appColors.white }}>
                        {isLoading ? <ActivityIndicator /> : locations.length > 0 ?
                            <FlatList data={locations} renderItem={({ item }) =>
                                <TouchableOpacity style={{ marginBottom: 12 }} onPress={() => {
                                    setAddressSelected(item.display_name);
                                    setSearchKey('');
                                }}>
                                    <TextComponent text={item.display_name} />
                                </TouchableOpacity>} /> : <View>
                                <TextComponent text={searchKey ? 'Location not found' : 'Search location'} />
                            </View>
                        }
                        <ButtonComponent text='Confirm' type='primary' onPress={() => {
                            
                            onSelect(addressSelected);
                            onClose();
                        }} />
                    </View>
                    <SpaceComponent width={12} />
                    <ButtonComponent text='Cancel' type='link' onPress={hanleClose} />


                </RowComponent>

            </View>
        </Modal>
    )
}

export default ModalLocation