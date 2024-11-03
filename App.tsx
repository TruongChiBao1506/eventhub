import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SplashScreen } from "./src/screen";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigators/AuthNavigator";

const App = () =>{
  const [isShowSplash, setIsShowSplash] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    },1500);
  },[])
  return (
    <>
      <StatusBar barStyle="dark-content"
      backgroundColor="transparent"
      translucent />
    {isShowSplash ? (
      <SplashScreen />
    ) : (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    )}
    </>
  )
}
export default App;
