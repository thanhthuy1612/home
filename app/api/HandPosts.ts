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
}

const handlePosts = new HandlePost();

export default handlePosts;
