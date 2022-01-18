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
import { DeskApi } from "../../api/DeskApi";
import { AreaType } from "../../types/areaType";

type AddDeskScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeAddDesk"
>;
type AddDeskScreenRouteProp = RouteProp<RootStackParamList, "OfficeAddDesk">;
const AddDeskScreen = () => {
  const [deskSchedules, setDeskSchedules] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [selectedArea, setSelectedArea] = useState<AreaType>([]);
  const [deskList, setDeskList] = useState<DeskType[]>([]);
  const [chooseBranchModal, setChooseBranchModal] = useState<boolean>(false);
  useState<boolean>(true);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<AddDeskScreenNavigationProp>();
  const route = useRoute<AddDeskScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const { areaId } = route.params;
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );
  useEffect(() => {
    if (isLoggedIn && token && selectedBranch) {
      console.log("areaId");
      console.log(areaId);
      getAreaDetail();
    } else {
      dispatch(logout());
    }
  }, []);

  const getAreaDetail = async () => {
    setIsRefreshing(true);
    if (areaId) {
      const result = await DeskApi.getOneArea(areaId);
      if (result.status === 200) {
        console.log(result.data);
        if (result.data.length) {
          setSelectedArea(result.data);
        }
      }
    } else {
      navigation.navigate("OfficeArea");
    }
    setIsRefreshing(false);
  };

  return (
    <VStack safeAreaTop h="100%" mx={4}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={getAreaDetail} />
        }
        _contentContainerStyle={{ pb: 16 }}
      >
        <Flex direction="row" w="100%" align="center" my={5}>
          {/* <Image
                  w="150px"
                  h="50%"
          resizeMode="contain"
          alt="menuworlds"
          source={require("./../assets/menuworlds_black.png")}
        /> */}
          <Heading
            fontFamily="sf-pro-text-semibold"
            fontSize={20}
            fontWeight="800"
          >
            Select Desk
          </Heading>
        </Flex>
      </ScrollView>
    </VStack>
  );
};

export default AddDeskScreen;
