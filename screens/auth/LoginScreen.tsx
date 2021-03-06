import {
  Flex,
  Image,
  Box,
  Text,
  Button,
  Input,
  KeyboardAvoidingView,
  useToast,
  Pressable,
} from "native-base";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import { AuthApi } from "../../api/AuthApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, logout } from "../../app/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearCompany } from "../../app/company/companySlice";

type Inputs = {
  email: string;
  password: string;
};
type loginScreenProp = StackNavigationProp<RootStackParamList, "Login">;
const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigation = useNavigation<loginScreenProp>();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("OfficeHome");
    } else {
      getTokenFromAsyncStorage();
    }
  }, []);

  const getTokenFromAsyncStorage = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await AsyncStorage.getItem("user");
    // dispatch(logout());
    if (token && user) {
      dispatch(
        login({
          token,
          user: JSON.parse(user),
        })
      );
    }
  };

  const onSubmit = async (field: Inputs) => {
    const payload = {
      email: field.email,
      password: field.password,
    };
    const result = await AuthApi.login(payload);
    console.log(payload);
    if (result.status === 201) {
      AsyncStorage.setItem("token", result.data.token);
      AsyncStorage.setItem("user", JSON.stringify(result.data.user));
      console.log(result.data);
      dispatch(
        login({
          token: result.data.token,
          user: result.data.user,
        })
      );
      dispatch(clearCompany());
    } else {
      await toast.closeAll();
      toast.show({
        title: "Try again later!",
        description: "Something wrong...",
        status: "warning",
        placement: "top",
      });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box position="relative" w="100%" h="100%">
        <Image
          w="100%"
          h="100%"
          alt="bg image"
          source={require("./../../assets/table.jpg")}
        />

        <Flex
          align="center"
          justify="center"
          zIndex="99"
          position="absolute"
          h="100%"
          w="100%"
          bg="dark.50:alpha.80"
        >
          <Flex
            align="center"
            justify="center"
            h="100%"
            w={{ base: "300px", md: "450px" }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Input
                    InputLeftElement={
                      <Flex justify="center" align="center" w="40%">
                        <Text
                          bg="dark.100"
                          color="dark.800"
                          fontFamily="sf-pro-text-medium"
                          fontSize="15px"
                        >
                          Email
                        </Text>
                      </Flex>
                    }
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    pl={5}
                    my={errors.email ? 4 : 2}
                    mt={2}
                    h={16}
                    bg="dark.100"
                    type="email"
                    color="dark.800"
                    fontFamily="sf-pro-text-regular"
                    fontSize="15px"
                    placeholder="email@email.com"
                    borderWidth={0.5}
                    borderColor="dark.200"
                    _focus={{
                      borderWidth: 0.5,
                      borderColor: "dark.200",
                    }}
                    isInvalid={errors.email ? true : false}
                  />

                  {/* {errors.email && (
                    <Text color="red.500">This is required.</Text>
                  )} */}
                </>
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Input
                    InputLeftElement={
                      <Flex justify="center" align="center" w="40%">
                        <Text
                          bg="dark.100"
                          color="dark.800"
                          fontFamily="sf-pro-text-medium"
                          fontSize="15px"
                        >
                          Password
                        </Text>
                      </Flex>
                    }
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    pl={5}
                    my={errors.email ? 4 : 2}
                    mt={2}
                    h={16}
                    bg="dark.100"
                    type="password"
                    color="dark.800"
                    fontFamily="sf-pro-text-regular"
                    fontSize="15px"
                    placeholder="required"
                    borderWidth={0.5}
                    borderColor="dark.200"
                    _focus={{
                      borderWidth: 0.5,
                      borderColor: "dark.200",
                    }}
                    isInvalid={errors.password ? true : false}
                  />
                  {/* {errors.password && (
                    <Text color="red.500">This is required.</Text>
                  )} */}
                </>
              )}
              name="password"
            />
            <Button
              w="100%"
              mt={5}
              h={12}
              colorScheme="themeColor"
              _text={{
                color: "textColor.buttonText",
                fontFamily: "sf-pro-text-medium",
                fontSize: "17px",
              }}
              onPress={handleSubmit(onSubmit)}
            >
              Sign In
            </Button>

            <Pressable
              w="100%"
              mt={3}
              h={10}
              onPress={() => navigation.navigate("Register")}
            >
              <Flex direction="row" justify="center">
                <Text
                  color="textColor.buttonText"
                  fontFamily="sf-pro-text-medium"
                  fontSize="15px"
                ></Text>
                <Text
                  pl={2}
                  color="themeColor.600"
                  fontFamily="sf-pro-text-medium"
                  fontSize="15px"
                >
                  Register Now
                </Text>
              </Flex>
            </Pressable>
          </Flex>
        </Flex>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
