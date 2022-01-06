import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { SSRProvider } from "@react-aria/ssr";
import * as ScreenOrientation from "expo-screen-orientation";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Platform } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    dottedColor: {
      borderColor: "#aeadb2",
      textColor: "#636365",
    },
    iconColor: {
      grey: "#3a3a3c",
    },
    bgDarkColor: {
      50: "#000000",
      100: "#1c1c1e",
      200: "#2c2c2e",
      300: "#3a3a3c",
      400: "#48484a",
      500: "#e6e6f0",
      600: "#8f8e93",
    },
    bgLightColor: {
      50: "#f3f2f7",
      100: "#e6e5ea",
      200: "#d2d1d6",
      300: "#c8c7cc",
      400: "#aeadb2",
      500: "#8f8e93",
      600: "#636365",
      700: "#48484a",
      800: "#3a3a3c",
      900: "#020202",
      1000: "#1c1c1e",
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
  };

  changeScreenOrientation();
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <SSRProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <AppNavigator />
            </GestureHandlerRootView>
          </SSRProvider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  );
}

// Color Switch Component
