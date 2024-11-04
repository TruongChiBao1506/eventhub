import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SplashScreen } from "./src/screen";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigators/AuthNavigator";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import MainNavigators from "./src/navigators/MainNavigators";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import AppRouter from "./src/navigators/AppRouter";

const App = () => {



  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content"
          backgroundColor="transparent"
          translucent />
        <NavigationContainer>
          <AppRouter />
        </NavigationContainer>
      </Provider>

    </>
  )
}
export default App;
