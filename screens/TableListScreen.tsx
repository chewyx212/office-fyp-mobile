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
  AlertDialog,
  Modal,
  IconButton,
  useToast,
  Menu,
  useContrastText,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { tableData, tableCategoryData } from "../assets/DUMMY";
import PrimaryButton from "../components/Ui/PrimaryButton";
import SecondaryButton from "../components/Ui/SecondaryButton";
import SlideFromRight from "../components/Ui/SlideFromRight";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeCart, clearCart } from "../app/cart/cartSlice";
import { setOrder } from "../app/order/orderSlice";
import { fetchOrder, storeOrder } from "../helpers/fetchOrder";
import NumberPadInput from "../components/NumberPadInput";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TableCategoryType, TableDataType } from "../types/tableType";

const mappingItemCategory = () => {
  // let category: TableCategoryType[] = [];
  // let idList: number[] = [];
  // tableData.forEach((table: TableDataType) => {
  //   if (!idList.includes(table.table_category.id)) {
  //     idList.push(table.table_category.id);
  //     category.push(table.table_category);
  //   }
  // });
  // return category;
  return tableCategoryData;
};

type TableScreenProp = StackNavigationProp<RootStackParamList, "Table">;
type TableScreenRouteProp = RouteProp<RootStackParamList, "Table">;
const TableListScreen = () => {
  const [tableList, setTableList] = useState<TableDataType[]>(tableData);
  const [categoryList, setCategoryList] = useState<TableCategoryType[]>(
    mappingItemCategory()
  );
  const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false);
  const [showCustomQuantityModal, setShowCustomQuantityModal] =
    useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<TableDataType>({});
  const [showTableOrder, setShowTableOrder] = useState<TableDataType>({});
  const [selectedCategory, setSelectedCategory] = useState<number>(
    mappingItemCategory()[0].id
  );
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [orderDetail, setOrderDetail] = useState({
    subtotal: 0.0,
    total: 0.0,
    discount: 0.0,
    tax: 0.0,
  });
  const dispatch = useAppDispatch();
  const orderItem = useAppSelector((state) => state.order.orders);
  const cartItem = useAppSelector((state) => state.cart.cartItem);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<TableScreenProp>();

  return (
    <>
      <Stack
        position="relative"
        h="100%"
        direction="row"
        bg={useColorModeValue("light.100", "muted.800")}
      >
        <VStack h="100%" flex={6}>
          <Flex direction="row" w="100%" h="100%">
            <Stack flex={3}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                overflow="scroll"
                _contentContainerStyle={{
                  pt: 5,
                }}
              >
                {categoryList.map((category) => {
                  let isActive = category.id === selectedCategory;
                  let bgColor = useColorModeValue("transparent", "transparent");
                  let textColor = useColorModeValue("muted.500", "muted.400");
                  if (isActive) {
                    bgColor = useColorModeValue("primary.500", "primary.700");
                    textColor = useColorModeValue("light.50", "light.50");
                  }
                  return (
                    <Pressable
                      key={category.id}
                      bg={bgColor}
                      disabled={isActive}
                      borderRadius="0"
                      py={5}
                      onPress={() => {
                        setSelectedCategory(category.id);
                      }}
                    >
                      {(isHovered, isFocused, isPressed) => (
                        <Text
                          color={textColor}
                          pl={3}
                          fontFamily="sf-pro-text-medium"
                          fontSize={{ base: 17, md: 15 }}
                        >
                          {category.name}
                        </Text>
                      )}
                    </Pressable>
                  );
                })}
              </ScrollView>
            </Stack>
            <Flex
              flex={10}
              m={5}
              bg={useColorModeValue("white", "black")}
              borderRadius="2xl"
              shadow={2}
            >
              
            </Flex>
          </Flex>
        </VStack>

        {/* <-------------- Quantity Modal when order on table--> */}

        <Modal
          isOpen={showQuantityModal}
          onClose={() => setShowQuantityModal(false)}
        >
          <Modal.Content maxW={{ base: "320px", md: "400px" }} w="100%">
            <Modal.CloseButton />
            <Modal.Header>Number of customer</Modal.Header>
            <Modal.Body>
              <Flex direction="row" w="100%" align="flex-start" wrap="wrap">
                {[...Array(7)].map((elementInArray, index) => (
                  <Button
                    key={index}
                    flex={1}
                    borderColor="light.400"
                    borderWidth={0.5}
                    bg="transparent"
                    _text={{ color: "light.400" }}
                    _pressed={{
                      bg: useColorModeValue("light.200", "dark.200"),
                    }}
                    flexBasis="23%"
                    mx="1%"
                    my="3%"
                    maxW="23%"
                    h={16}
                    onPress={() => onSelectQuantity(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  flex={1}
                  borderColor="light.400"
                  borderWidth={0.5}
                  bg="transparent"
                  _text={{ color: "light.400" }}
                  _pressed={{
                    bg: useColorModeValue("light.200", "dark.200"),
                  }}
                  flexBasis="23%"
                  mx="1%"
                  my="3%"
                  maxW="23%"
                  h={16}
                  onPress={() => setShowCustomQuantityModal(true)}
                >
                  Custom
                </Button>
              </Flex>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Stack>
    </>
  );
};

export default TableListScreen;
