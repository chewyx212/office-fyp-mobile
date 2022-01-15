import * as React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import TableScreen from "../screens/TableScreen";
import CameraScreen from "../screens/CameraScreen";
import PrinterScreen from "../screens/PrinterScreen";
import { useWindowDimensions } from "react-native";
import { FontAwesome, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import {
  Flex,
  Icon,
  Text,
  Pressable,
  useColorModeValue,
  Image,
  Menu,
} from "native-base";
import MenuScreen from "../screens/MenuScreen";
import MemberScreen from "../screens/MemberScreen";
import TransactionScreen from "../screens/TransactionScreen";
import SettingScreen from "../screens/SettingSceen";
import SettingNavigator from "./SettingNavigator";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
      initialRouteName="OfficeHome"
    >
      <Tab.Screen name="OfficeHome" component={HomeScreen} />
      <Tab.Screen name="OfficeProfile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
const CustomTabBar = (props: BottomTabBarProps) => {
  const currentRoute = props.state.routeNames[props.state.index];

  return (
    <Flex
      direction="row"
      align="center"
      justify="space-between"
      py={4}
      px={8}
      _light={{
        bg: "white",
      }}
      _dark={{
        bg: "greyColor.1000",
      }}
      shadow={3}
    >
      <Flex direction="column" align="center">
        <Icon
          color={useColorModeValue("greyColor.900", "greyColor.600")}
          as={FontAwesome}
          name="building-o"
          size={5}
        />
      </Flex>

      <Menu
        placement="top"
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Icon
                color={useColorModeValue("themeColor.500", "greyColor.600")}
                as={FontAwesome}
                name="plus"
                size={5}
              />
            </Pressable>
          );
        }}
      >
        <Menu.Item>Book Desk</Menu.Item>
        <Menu.Item>Book Room</Menu.Item>
      </Menu>

      <Flex direction="column" align="center">
        <Icon
          color={useColorModeValue("greyColor.900", "greyColor.600")}
          as={FontAwesome}
          name="user-o"
          size={5}
        />
      </Flex>
    </Flex>
  );
};

export default TabNavigator;
