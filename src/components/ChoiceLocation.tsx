import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import RowComponent from './RowComponent'
import { globalStyles } from '../styles/globalStyle'
import TextComponent from './TextComponent'
import { ArrowRight2, Location } from 'iconsax-react-native'
import { appColors } from '../constants/appColor'
import CardComponent from './CardComponent'
import SpaceComponent from './SpaceComponent'
import ModalLocation from '../modals/ModalLocation'

interface Props {
    onSelect: (val: any) => void;
}

const ChoiceLocation = (props: Props) => {
    const { onSelect } = props;

    const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false);
    const [addressSelected, setAddressSelected] = useState<{
        address: string;
        position?: {
            lat: number;
            long: number;
        };
    }>();

    return (
        <>
            <RowComponent
                onPress={() => setIsVisibleModalLocation(!isVisibleModalLocation)}
                styles={[globalStyles.inputContainer]}>
                <Location variant='Bold' size={22} color={`${appColors.primary}80`} />
                <SpaceComponent width={12} />
                <TextComponent text={addressSelected ? addressSelected.address : 'Choice'} flex={1} numberOfLine={1} />
                <ArrowRight2 color={appColors.primary} size={22} />

            </RowComponent>

            <ModalLocation
                visible={isVisibleModalLocation}
                onClose={() => setIsVisibleModalLocation(false)}
                onSelect={val => {
                    setAddressSelected(val);
                    onSelect(val);
                }
                } />
        </>
    )
}

export default ChoiceLocation

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#5568FF80',
        height: 45,
        width: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    }
})