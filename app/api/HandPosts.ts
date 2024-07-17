import axiosClient from './axiosClient';
import { IListRoom } from './interfaces/IListRoom';

import { url } from './url';

const path = url.post;

class HandlePost {
  getListPosts = async (body: IListRoom) => {
    return (await axiosClient.post(`${path}/list`, { ...body })).data;
  };
}

const handlePosts = new HandlePost();

export default handlePosts;
