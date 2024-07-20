import axios from 'axios';
import { baseURL } from './url';

const axiosAuth = axios.create({ baseURL: baseURL });

axiosAuth.interceptors.request.use(async (config: any) => {
  const accessToken = localStorage.getItem('token');
  (config.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    ...config.headers,
  }),
    config.data;

  return config;
});

axiosAuth.interceptors.response.use(
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

export default axiosAuth;
