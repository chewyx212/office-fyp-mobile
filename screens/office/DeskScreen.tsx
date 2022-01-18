import {
  Text,
  Stack,
  HStack,
  useColorModeValue,
  Heading,
  Box,
  Button,
  VStack,
  ScrollView,
  FlatList,
  Flex,
  Image,
  Pressable,
  View,
  Icon,
  Checkbox,
  Radio,
  AlertDialog,
  Modal,
  IconButton,
  useToast,
  TextArea,
  KeyboardAvoidingView,
  Circle,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import { logout } from "../../app/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AuthApi } from "../../api/AuthApi";
import { CompanyApi } from "../../api/CompanyApi";
import { BranchState } from "../../types/branchType";
import {
  saveCompany,
  saveCompanyBranch,
  selectBranch,
} from "../../app/company/companySlice";
import { Platform, RefreshControl } from "react-native";

type DeskScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeDesk"
>;
type DeskScreenRouteProp = RouteProp<RootStackParamList, "OfficeDesk">;
const DeskScreen = () => {
  const dummyAnnouncements = [
    {
      time: "Monday, 24 January 2022",
      title: "Hello, wear mask lah 😷",
      detail:
        "Lorem dasdasdsadummmy dummy dummy dummy ipsuasdada m dolor sqsasdasdit amet asdasdasd td consectetur athis is just some dummy dummy udmmy dummy loreom in spum text please beeeeee edummy asdadsadsagebb dipisicing asdadasdadsaadadasdasdadadasdasdad",
    },
    {
      time: "Monday, 23 January 2022",
      title: "Please Wear your mask 😷",
      detail:
        "Lorem dummmy dummy dummy dummy ipsuasdada m dolor sqsasdasdit amet asdasdasd td consectetur athis is just some dummy dummy udmmy dummy loreom in spum text please beeeeee edummy asdadsadsagebb dipisicing asdadasdadsaadadasdasdadadasdasdad",
    },
  ];
  const [deskSchedules, setDeskSchedules] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [gotCompanyOrBranch, setGotCompanyOrBranch] = useState<boolean>(false);
  const [availableBranch, setAvailableBranch] = useState<BranchState[]>([]);
  const [chooseBranchModal, setChooseBranchModal] = useState<boolean>(false);
  useState<boolean>(true);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<DeskScreenNavigationProp>();
  const route = useRoute<DeskScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );
  useEffect(() => {
    if (isLoggedIn && token) {
      console.log(isLoggedIn);
      console.log(token);
      getUserDetail();
    } else {
      dispatch(logout());
    }
  }, []);

  const getUserDetail = async () => {
    setIsRefreshing(true);
    const result = await AuthApi.getDetail();
    if (result.status === 200) {
      let branchList: BranchState[] = [];

      if (result.data.deskSchedules.length > 0) {
        setDeskSchedules(result.data.roomSchedules);
      }
    }
    setIsRefreshing(false);
  };

  const onCloseBranchModal = () => {
    if (selectedBranch) {
      setChooseBranchModal(false);
    }
  };

  return (
    <VStack safeAreaTop h="100%" mx={4}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={getUserDetail} />
        }
        _contentContainerStyle={{ pb: 16 }}
      >
        <Flex
          direction="row"
          w="100%"
          justify="space-between"
          align="center"
          my={5}
        >
          {/* <Image
                  w="150px"
                  h="50%"
          resizeMode="contain"
          alt="menuworlds"
          source={require("./../assets/menuworlds_black.png")}
        /> */}
          <Flex></Flex>
          <Heading
            fontFamily="sf-pro-text-semibold"
            fontSize={20}
            fontWeight="800"
          >
            Desk
          </Heading>

          <Pressable onPress={() => navigation.navigate("OfficeArea")}>
            <Icon
              color={useColorModeValue("themeColor.500", "greyColor.600")}
              as={FontAwesome}
              name="plus"
              size={5}
            />
          </Pressable>
        </Flex>
        {deskSchedules.length > 0 &&
          deskSchedules.map((schedule) => {
            return (
              <Flex
                key={schedule.id}
                bg={useColorModeValue("white", "greyColor.1000")}
                borderRadius="xl"
                px={3}
                py={3}
                my={1}
              >
                <Text
                  fontFamily="sf-pro-text-regular"
                  fontSize={13}
                  fontWeight="500"
                >
                  {new Date(schedule.datetime).toLocaleString()}
                </Text>
                <Text
                  fontFamily="sf-pro-text-medium"
                  fontSize={15}
                  fontWeight="700"
                  my={1}
                >
                  {schedule.desk.name}
                </Text>
                <Text
                  fontFamily="sf-pro-text-regular"
                  fontSize={15}
                  fontWeight="500"
                  color={useColorModeValue("greyColor.400", "greyColor.400")}
                  noOfLines={2}
                  isTruncated
                >
                  {schedule.duration} hour(s)
                </Text>
              </Flex>
            );
          })}
      </ScrollView>
    </VStack>
  );
};

export default DeskScreen;
