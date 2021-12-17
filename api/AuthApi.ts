// import { LoginForm, RegisterForm } from "types/AuthType";
import axios from "../utils/axios/AxiosHandler";

export const AuthApi = {
  merchantLogin: async (data: { input: string; password: string }) => {
    return axios.post("/api/pos/login", data);
  },
  counterLogin: async (payload: string) => {
    return axios.post("/api/pos/login-counter", payload);
  },
  updatePasscode: async (payload: string) => {
    return axios.post("/api/pos/update-passcode", payload);
  },
};
