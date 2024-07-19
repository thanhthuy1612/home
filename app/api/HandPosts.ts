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
  getImg = async (id: string, file: string) => {
    return await axiosAuth.get(`${path}/${id}/${file}`);
  };
}

const handlePosts = new HandlePost();

export default handlePosts;
