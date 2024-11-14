import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { appColors } from '../constants/appColor';
import { Category } from '../models/Category';
import { KnifeFork } from '../assets/svgs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { ButtonComponent, RowComponent, SectionComponent, TextComponent } from '../components';
import eventAPI from '../apis/eventApi';
import { globalStyles } from '../styles/globalStyle';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import userAPI from '../apis/userApi';

interface Props{
    visible: boolean;
    onClose: ()=> void;
    onSelected: (vals: string[]) => void;
    selected?: string[];
    categories: Category[];
}

const ModalSelectCategories = (props: Props) => {
    const { visible, onClose, onSelected, selected,categories } = props;
    const [catsSelected, setCatsSelected] = useState<string[]>(selected ?? []);
    const modalizeRef = useRef<Modalize>();
    const auth = useSelector(authSelector);

    

    useEffect(() => {
        if(visible){
            modalizeRef.current?.open();
        }
        else{
            modalizeRef.current?.close();
        }
    }, [visible]);


    
    const onSelectedCategory = (id: string) => {
        const items = [...catsSelected];
        const index = items.findIndex(element=> element === id);

        if(index !== -1){
            items.splice(index,1);
            setCatsSelected(items);
        }else{
            setCatsSelected([...items, id]);
        }
    }
    const handleUpdateInterests = async () => {
        const api = `/update-interests?uid=${auth.id}`;

        try {
            const res = await userAPI.HandleUser(api, catsSelected, 'put');
            onSelected(catsSelected);
        } catch (error) {
            console.log(error);
            
        }

    }
  return (
    <Portal>
        <Modalize handlePosition='inside' adjustToContentHeight ref={modalizeRef} onClose={onClose} >
            <SectionComponent styles = {{padding:30}}>
                <RowComponent>
                    {categories.length > 0 && categories.map(category=> 
                    <TouchableOpacity onPress={()=> onSelectedCategory(category._id)}
                    style = {[globalStyles.shadow, globalStyles.center,
                    {padding:12, 
                    marginRight:8, 
                    marginBottom: 8, 
                    backgroundColor: appColors.white,
                    borderRadius:12,
                    minWidth:80,
                    borderWidth:1,
                    borderColor: catsSelected?.includes(category._id)? appColors.primary:appColors.white}]} key = {category._id}>
                        <TextComponent text={category.title} />
                    </TouchableOpacity>)}
                </RowComponent>

                
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent type='primary' onPress={handleUpdateInterests} text='Agree'/>
            </SectionComponent>
        </Modalize>
    </Portal>
  )
}

export default ModalSelectCategories