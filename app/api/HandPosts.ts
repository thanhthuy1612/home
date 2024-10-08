import axiosAuth from './axiosAuth';
import axiosClient from './axiosClient';
import { IBookRoom } from './interfaces/IBookRoom';
import { IListRoom } from './interfaces/IListRoom';
import { IPageSize } from './interfaces/IPageSize';
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
    return await axiosAuth.put(`${path}/${id}`, formData, {
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
  getImgEdit = async (id: string, file: string) => {
    const response = await axiosClient.get(`${path}/${id}/${file}`, {
      responseType: 'blob',
    });
    return {
      url: URL?.createObjectURL(response?.data),
      file: new File([response?.data], file, {
        type: response?.data.type,
      }),
    };
  };
  getPost = async (id: string) => {
    return await axiosClient.get(`${path}/${id}`);
  };
  deletePost = async (id: string) => {
    return await axiosAuth.delete(`${path}/${id}`);
  };
  postBook = async (id: string, body: IBookRoom) => {
    return await axiosClient.post(`${path}/${id}/booking`, body);
  };
  getContact = async () => {
    return await axiosClient.get(`${path}/contact`);
  };
  getHold = async (body: IPageSize) => {
    return await axiosAuth.post(`${path}/myholding`, body);
  };
  holdRoom = async (id: string) => {
    return await axiosAuth.post(`${path}/${id}/hold`);
  };
  unholdRoom = async (id: string) => {
    return await axiosAuth.post(`${path}/${id}/unhold`);
  };
}

const handlePosts = new HandlePost();

export default handlePosts;
