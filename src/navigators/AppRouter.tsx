import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../redux/reducers/authReducer'
import AuthNavigator from './AuthNavigator'
import MainNavigators from './MainNavigators'
import { SplashScreen } from '../screen'

const AppRouter = () => {
    const [isShowSplash, setIsShowSplash] = useState(true);
    const { getItem } = useAsyncStorage('auth');
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);

    
    useEffect(() => {
        checkLogin();
        const timeout = setTimeout(() => {
            setIsShowSplash(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [])
    const checkLogin = async () => {
        const res = await getItem();
        console.log(res);

        res && dispatch(
            addAuth(JSON.parse(res)),
        );

    };
    return (
        <>

            {isShowSplash ? <SplashScreen /> : auth.accesstoken ? <MainNavigators /> : <AuthNavigator />}
        </>
    )
}

export default AppRouter