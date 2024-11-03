import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SplashScreen } from "./src/screen";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigators/AuthNavigator";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import MainNavigators from "./src/navigators/MainNavigators";

const App = () =>{
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const {getItem,setItem} = useAsyncStorage('assetToken');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    },1500);

    return ()=> clearTimeout(timeout);
  },[])

  const checkLogin = async () => {
    const token = await getItem();
    token && setAccessToken(token);
    
  };

  return (
    <>
      <StatusBar barStyle="dark-content"
      backgroundColor="transparent"
      translucent />
    {isShowSplash ? (
      <SplashScreen />
    ) : (
      <NavigationContainer>
        {accessToken ? <MainNavigators /> : <AuthNavigator />}
      </NavigationContainer>
    )}
    </>
  )
}
export default App;
