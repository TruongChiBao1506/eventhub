import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../redux/reducers/authReducer'
import AuthNavigator from './AuthNavigator'
import MainNavigators from './MainNavigators'

const AppRouter = () => {
    const {getItem} = useAsyncStorage('auth');
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);

    console.log(auth);
    

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        const res = await getItem();
        console.log(res);
        
        res && dispatch(
            addAuth(JSON.parse(res)),
        );
        
    };
  return (
    <>
      {auth.accesstoken ? <MainNavigators /> : <AuthNavigator />}
    </>
  )
}

export default AppRouter