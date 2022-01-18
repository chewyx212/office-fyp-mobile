import axios from "../utils/axios/AxiosHandler";

export const DeskApi = {
  getAllScheduledDesk: async () => {
    return axios.get("/desk");
  },
  getAllArea: async (branchId: string) => {
    return axios.get(`area?branchId=${branchId}`);
  },
  getOneArea: async (areaId: string) => {
    return axios.get(`area/${areaId}`);
  },
};
