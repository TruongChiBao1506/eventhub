import { View, Text } from 'react-native'
import React from 'react'
import { SelectModel } from '../models/SelectModel';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import { ArrowDown2 } from 'iconsax-react-native';
import { appColors } from '../constants/appColor';
import { globalStyles } from '../styles/globalStyle';

interface Props {
    label?: string;
    values: SelectModel[];
    selected?: string | string[];
    onSelect: (val: string) => void;
}

const DropdownPicker = (props: Props) => {
const { label, values, selected, onSelect } = props;

  return (
    <View style = {{marginBottom:8}}>
      {label && <TextComponent text={label} styles = {{marginBottom:8}}/>}
      <RowComponent styles = {[globalStyles.inputContainer]} onPress={()=>{}}>
        <RowComponent styles = {{flex:1}}>
            <TextComponent text='select'/>
        </RowComponent>
        <ArrowDown2 size={22} color={appColors.gray}/>
      </RowComponent>
    </View>
  )
}

export default DropdownPicker