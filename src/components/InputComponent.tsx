import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    TextInputProps,
    KeyboardType,
    StyleProp,
    ViewStyle,
} from 'react-native';
import React, { ReactNode, useState } from 'react';
import { Touchable } from 'react-native';
import { EyeSlash } from 'iconsax-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { globalStyles } from '../styles/globalStyle';
import { appColors } from '../constants/appColor';

interface Props {
    value: string;
    onChange: (val: string) => void;
    affix?: ReactNode;
    placeholder?: string;
    suffix?: ReactNode;
    isPassword?: boolean;
    allowClear?: boolean;
    type?: KeyboardType;
    onEnd?: () => void;
    multiline?: boolean;
    numberOfLines?: number;
    styles?: StyleProp<ViewStyle>;
}

const InputComponent = (props: Props) => {
    const {
        value,
        onChange,
        affix,
        suffix,
        placeholder,
        isPassword,
        allowClear,
        type,
        onEnd,
        multiline,
        numberOfLines,
        styles
    } = props;

    const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

    return (
        <View style={[globalStyles.inputContainer,styles]}>
            {affix ?? affix}
            <TextInput
                style={[globalStyles.input, globalStyles.text,{paddingHorizontal: affix || suffix ? 12 : 0,
                    textAlignVertical: multiline ? 'top' : 'auto',
                }]}
                multiline = {multiline}
                value={value}
                numberOfLines={numberOfLines}
                placeholder={placeholder ?? ''}
                onChangeText={val => onChange(val)}
                secureTextEntry={isShowPass}
                placeholderTextColor={'#747688'}
                keyboardType={type ?? 'default'}
                autoCapitalize="none"
                onEndEditing={onEnd}
            />
            {suffix ?? suffix}
            <TouchableOpacity
                onPress={
                    isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
                }>
                {isPassword ? (
                    <FontAwesome
                        name={isShowPass ? 'eye-slash' : 'eye'}
                        size={22}
                        color={appColors.gray}
                    />
                ) : (value &&
                    value.length > 0 &&
                    allowClear && (
                        <AntDesign name="close" size={22} color={appColors.text} />
                    )
                )}
            </TouchableOpacity>
        </View>
    );
};

export default InputComponent;