import axios from 'axios';
import { baseURL } from './url';

const axiosClient = axios.create({ baseURL: baseURL });

axiosClient.interceptors.request.use(async (config: any) => {
  const content = JSON.stringify(config?.data);
  const contentLength = content.length;
  (config.headers = {
    'Content-Length': contentLength,
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
