import React, { useEffect } from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  NativeBaseProvider,
  extendTheme,
  VStack,
} from "native-base";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { SSRProvider } from "@react-aria/ssr";
import * as ScreenOrientation from "expo-screen-orientation";
import { Provider } from "react-redux";
import { store } from "./app/store";

const theme = extendTheme({
  fontConfig: {
    SFPro: {
      100: { normal: "sf-pro-text-regular" },
      200: { normal: "sf-pro-text-medium" },
      300: { normal: "sf-pro-text-semibold" },
      400: { normal: "sf-pro-text-bold" },
      500: { normal: "sf-pro-display-regular" },
      600: { normal: "sf-pro-display-bold" },
    },
    fonts: {
      heading: "SFPro",
      body: "SFPro",
      mono: "SFPro",
    },
  },
  colors: {
    // Add new color
    myPrimary: {
      50: "#FF9671",
      100: "#d16f4d",
      200: "#cc5f39",
      300: "#FF9671",
      400: "#a74b2b",
      500: "#934226",
      600: "#7e3921",
      700: "#7e3921",
      800: "#6a301b",
      900: "#550000",
    },
    primaryButton: {
      lightBg: "#2563eb",
      darkBg: "#1e40af",
      lightPressBg: "#1d4ed8",
      darkPressBg: "#1e3a8a",
      lightText: "#fafafa",
      darkText: "#e7e5e4",
      lightPressText: "#fafaf9",
      darkPressText: "#f5f5f4",
    },
    secondaryButton: {
      lightBg: "#2563eb",
      darkBg: "#1e40af",
      lightPressBg: "#1d4ed8",
      darkPressBg: "#1e3a8a",
      lightText: "#fafafa",
      darkText: "#e7e5e4",
      lightPressText: "#fafaf9",
      darkPressText: "#f5f5f4",
    },
  },
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
    dependencies: {
      "linear-gradient": require("expo-linear-gradient").LinearGradient,
    },
  },
});

export default function App() {
  let [fontLoaded] = useFonts({
    "sf-pro-display-regular": require("./assets/Fonts/SF-Pro-Display-Regular.otf"),
    "sf-pro-display-bold": require("./assets/Fonts/SF-Pro-Display-Bold.otf"),
    "sf-pro-text-regular": require("./assets/Fonts/SF-Pro-Text-Regular.otf"),
    "sf-pro-text-bold": require("./assets/Fonts/SF-Pro-Text-Bold.otf"),
    "sf-pro-text-semibold": require("./assets/Fonts/SF-Pro-Text-Semibold.otf"),
    "sf-pro-text-medium": require("./assets/Fonts/SF-Pro-Text-Medium.otf"),
  });
  if (!fontLoaded) {
    return <AppLoading />;
  }
  const changeScreenOrientation = async () => {
    const result = await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );

    console.log(result);
  };

  changeScreenOrientation();
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <SSRProvider>
          <AppNavigator />
        </SSRProvider>
      </NativeBaseProvider>
    </Provider>
  );
}

// Color Switch Component