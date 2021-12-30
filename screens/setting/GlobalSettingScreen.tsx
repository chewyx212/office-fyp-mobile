import { Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "../RootStackParams";

type GlobalSettingScreenProp = DrawerNavigationProp<
  RootStackParamList,
  "GlobalSetting"
>;
type GlobalSettingScreenRouteProp = RouteProp<
  RootStackParamList,
  "GlobalSetting"
>;
const GlobalSettingScreen = () => {
  const navigation = useNavigation<GlobalSettingScreenProp>();

  useEffect(() => {}, []);

  return (
    <>
      <Text>ABC</Text>
    </>
  );
};

export default GlobalSettingScreen;
