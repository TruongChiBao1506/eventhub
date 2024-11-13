import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, addFollowedEvent, authSelector, AuthState } from '../redux/reducers/authReducer'
import AuthNavigator from './AuthNavigator'
import MainNavigators from './MainNavigators'
import { SplashScreen } from '../screen'
import userAPI from '../apis/userApi'
import { UserHandle } from '../utils/UserHandlers'

const AppRouter = () => {
    const [isShowSplash, setIsShowSplash] = useState(true);
    const { getItem } = useAsyncStorage('auth');
    const dispatch = useDispatch();
    const auth: AuthState = useSelector(authSelector);


    useEffect(() => {
        handleGetDatas();
        // checkLogin();
        // const timeout = setTimeout(() => {
        //     setIsShowSplash(false);
        // }, 1500);

        // return () => clearTimeout(timeout);
    }, [])

    useEffect(() => {
        UserHandle.getFollowersById(auth.id, dispatch);
    }, [auth.id]);

    const handleGetDatas = async () => {
        await checkLogin();

        setIsShowSplash(false);
    };

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