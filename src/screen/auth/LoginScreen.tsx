import { Lock, Sms } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Switch } from 'react-native';
import authenticationAPI from '../../apis/authApi';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import SocialLogin from './components/SocialLogin';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appColors } from '../../constants/appColor';
import { Validate } from '../../utils/validate';


const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const emailValidation = Validate.email(email);

    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    if (emailValidation) {
      setIsLoading(true);
      try {
        const res = await authenticationAPI.HandleAuthentication(
          '/login',
          { email, password },
          'post',
        );

        console.log(res.data);
        
        dispatch(addAuth(res.data));

        await AsyncStorage.setItem(
          'auth',
          isRemember ? JSON.stringify(res.data) : email,
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
      Alert.alert('Email is not correct!!!!');
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{
            width: 162,
            height: 114,
            marginBottom: 30,
          }}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent size={24} title text="Sign in" />
        <SpaceComponent height={21} />
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <SpaceComponent width={4} />
            <TextComponent text="Remember me" />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password?"
            onPress={() => navigation.navigate('ForgotPassword')}
            type="text"
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent
          disable={ isLoading || isDisable}
          onPress={handleLogin}
          text="SIGN IN"
          type="primary"
        />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don’t have an account? " />
          <ButtonComponent
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;

// import { View, Text } from 'react-native'
// import React from 'react'

// const LoginScreen = () => {
//   return (
//     <View>
//       <Text>LoginScreen</Text>
//     </View>
//   )
// }

// export default LoginScreen
// import { View, Text } from 'react-native'
// import React from 'react'

// const LoginScreen = () => {
//   return (
//     <View>
//       <Text>LoginScreen</Text>
//     </View>
//   )
// }

// export default LoginScreen