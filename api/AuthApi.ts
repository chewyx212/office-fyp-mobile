import axios from "../utils/axios/AxiosHandler";

export const AuthApi = {
  login: async (data: { email: string; password: string }) => {
    console.log('im calling')
    return axios.post("/signin", data);
  },
  register: async (data: { email: string; name: string; password: string }) => {
    return axios.post("/signup", data);
  },
  updatePasscode: async (payload: {
    user_id: string;
    pos_password: string;
  }) => {
    return axios.post("/api/pos/update-password", payload);
  },
};
