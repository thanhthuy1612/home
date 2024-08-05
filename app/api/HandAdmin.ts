import { BookingStatus } from '@/enum/BookStatus';
import axiosAuth from './axiosAuth';
import { IAdminHold } from './interfaces/IAdminHold';
import { IAdminPost } from './interfaces/IAdminPost';
import { IListUserAdmin } from './interfaces/IListUserAdmin';
import { IPageSize } from './interfaces/IPageSize';
import { url } from './url';

const path = url.admin;

class HandAdmin {
  getListPostAdmin = async (body: IAdminPost) => {
    return await axiosAuth.post(`${path}/posts/list`, body);
  };
  getListUserAdmin = async (body: IListUserAdmin) => {
    return await axiosAuth.post(`${path}/users/list`, body);
  };
  getHold = async (body: IAdminHold) => {
    return await axiosAuth.post(`${path}/posts/holding`, body);
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
  getListBooking = async (body: IPageSize) => {
    return await axiosAuth.post(`${path}/bookings`, body);
  };
  updateBooking = async (id: string, status: BookingStatus) => {
    return await axiosAuth.put(`${path}/booking/${id}`, { status });
  };
  deleteBooking = async (id: string) => {
    return await axiosAuth.delete(`${path}/booking/${id}`);
  };
}

const handleAdmin = new HandAdmin();

export default handleAdmin;
