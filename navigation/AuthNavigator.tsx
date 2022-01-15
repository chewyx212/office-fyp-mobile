import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/auth/LandingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import { useAppSelector } from "../app/hooks";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? 'Passcode' : 'Login'}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
