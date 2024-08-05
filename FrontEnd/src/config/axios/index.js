import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("TOKEN");
      return Promise.reject(error);
    }
    throw error;
  }
);

export default axiosClient;
