import axiosAuth from './axiosAuth';
import { IAdminPost } from './interfaces/IAdminPost';
import { url } from './url';

const path = url.admin;

class HandAdmin {
  getListPostAdmin = async (body: IAdminPost) => {
    return await axiosAuth.post(`${path}/posts/list`, { ...body });
  };
}

const handleAdmin = new HandAdmin();

export default handleAdmin;
