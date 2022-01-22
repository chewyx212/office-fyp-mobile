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
  Box,
  Flex,
  Icon,
  Text,
  Pressable,
  useColorModeValue,
  Image,
  Menu,
} from "native-base";
import HomeScreen from "../screens/office/HomeScreen";
import ProfileScreen from "../screens/office/ProfileScreen";
import LandingScreen from "../screens/office/LandingScreen";
import AddDeskScreen from "../screens/office/AddDeskScreen";
import DeskScreen from "../screens/office/DeskScreen";
import AreaScreen from "../screens/office/AreaScreen";
import RoomScreen from "../screens/office/RoomScreen";
import AddRoomScreen from "../screens/office/AddRoomScreen";
import RoomStackNavigator from "./RoomStackNavigator";
import AllScheduleScreen from "../screens/office/AllScheduleScreen";

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
      <Tab.Screen name="OfficeLanding" component={LandingScreen} />
      <Tab.Screen name="OfficeProfile" component={ProfileScreen} />
      <Tab.Screen name="OfficeDesk" component={DeskScreen} />
      <Tab.Screen name="OfficeArea" component={AreaScreen} />
      <Tab.Screen name="OfficeAddDesk" component={AddDeskScreen} />
      <Tab.Screen name="OfficeSchedule" component={AllScheduleScreen} />
      {/* <Tab.Screen name="OfficeRoom" component={RoomScreen} />
      <Tab.Screen name="OfficeAddRoom" component={AddRoomScreen} /> */}
    </Tab.Navigator>
  );
};
const CustomTabBar = (props: BottomTabBarProps) => {
  const currentRoute = props.state.routeNames[props.state.index];

  return (
    <Box
      display={
        currentRoute === "OfficeRoom" || currentRoute === "OfficeAddRoom"
          ? "none"
          : "flex"
      }
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
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
      <Menu
        placement="top"
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Flex direction="column" align="center">
                <Icon
                  color={useColorModeValue("greyColor.900", "greyColor.600")}
                  as={FontAwesome}
                  name="building-o"
                  size={5}
                />
              </Flex>
            </Pressable>
          );
        }}
      >
        <Menu.Item onPress={() => props.navigation.navigate("OfficeSchedule")}>
          View All Schedule
        </Menu.Item>
        <Menu.Item onPress={() => props.navigation.navigate("OfficeBranch")}>
          View All Branchs
        </Menu.Item>
      </Menu>

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
        <Menu.Item onPress={() => props.navigation.navigate("OfficeArea")}>
          Book Desk
        </Menu.Item>
        <Menu.Item onPress={() => props.navigation.navigate("OfficeRoom")}>
          Book Room
        </Menu.Item>
      </Menu>

      <Pressable>
        <Flex direction="column" align="center">
          <Icon
            color={useColorModeValue("greyColor.900", "greyColor.600")}
            as={FontAwesome}
            name="user-o"
            size={5}
          />
        </Flex>
      </Pressable>
    </Box>
  );
};

export default TabNavigator;
