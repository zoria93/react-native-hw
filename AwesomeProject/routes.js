import React from "react";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import { BottomTabNavigator } from "./components/BottomTabNavigator";
import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator
        initialRouteName="Registration"
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen name="Registration" component={RegistrationScreen} />

        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          //   options={{

          //     setIsAuth: setIsAuth,
          //   }}
          //   component={LoginScreenWrapper}
        />
        <MainStack.Screen name="Home" component={HomeScreen} />
      </MainStack.Navigator>
    );
  }
  return <BottomTabNavigator />;
};
