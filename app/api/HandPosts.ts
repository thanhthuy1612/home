import axiosAuth from './axiosAuth';
import axiosClient from './axiosClient';
import { IListRoom } from './interfaces/IListRoom';
import { IPostMe } from './interfaces/IPostMe';

import { url } from './url';

const path = url.post;

class HandlePost {
  getListPosts = async (body: IListRoom) => {
    return await axiosClient.post(`${path}/list`, { ...body });
  };
  getMePosts = async (body: IPostMe) => {
    return await axiosAuth.post(`${path}/me`, { ...body });
  };
  getCreatePost = async (formData: FormData) => {
    return await axiosAuth.post(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  updatePost = async (id: string, formData: FormData) => {
    return await axiosAuth.post(`${path}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  getImg = async (id: string, file: string) => {
    const response = await axiosClient.get(`${path}/${id}/${file}`, {
      responseType: 'blob',
    });
    return URL?.createObjectURL(response?.data);
  };
  getPost = async (id: string) => {
    return await axiosClient.get(`${path}/${id}`);
  };
  deletePost = async (id: string) => {
    return await axiosAuth.delete(`${path}/${id}`);
  };
  getContact = async () => {
    return await axiosClient.get(`${path}/contact`);
  };
}

const handlePosts = new HandlePost();

export default handlePosts;
