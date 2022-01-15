import axios from "../utils/axios/AxiosHandler";

export const CompanyApi = {
  getCompanyDetail: async () => {
    return axios.get("company");
  },
};
