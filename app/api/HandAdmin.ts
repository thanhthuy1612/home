import axiosAuth from './axiosAuth';
import { IAdminPost } from './interfaces/IAdminPost';
import { IListUserAdmin } from './interfaces/IListUserAdmin';
import { url } from './url';

const path = url.admin;

class HandAdmin {
  getListPostAdmin = async (body: IAdminPost) => {
    return await axiosAuth.post(`${path}/posts/list`, { ...body });
  };
  getListUserAdmin = async (body: IListUserAdmin) => {
    return await axiosAuth.post(`${path}/users/list`, { ...body });
  };
  getPostAdmin = async (id: string) => {
    return await axiosAuth.get(`${path}/posts/${id}`);
  };
  activatePost = async (id: string) => {
    return await axiosAuth.put(`${path}/posts/approve/${id}`);
  };
  inactivatePost = async (id: string) => {
    return await axiosAuth.put(`${path}/posts/hide/${id}`);
  };
  activateUser = async (id: string) => {
    return await axiosAuth.put(`${path}/users/activate/${id}`);
  };
  inactivateUser = async (id: string) => {
    return await axiosAuth.put(`${path}/users/inactivate/${id}`);
  };
}

const handleAdmin = new HandAdmin();

export default handleAdmin;
