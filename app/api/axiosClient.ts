import axios from 'axios';

const axiosClient = axios.create({ baseURL: process.env.BASE_URL });

axiosClient.interceptors.request.use(async (config: any) => {
  (config.headers = {
    'Content-Type': 'application/json',
    ...config.headers,
  }),
    config?.data;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response?.status === 200 && response?.data) {
      return response;
    }

    return response;
  },
  (error) => {
    console.warn(`Lỗi kết nối đến cơ sở dữ liệu, ${error.message}`);
  },
);

export default axiosClient;
