import axiosAuth from './axiosAuth';
import axiosClient from './axiosClient';
import { IChangeInformation } from './interfaces/IChangeInformation';
import { IChangePassword } from './interfaces/IChangePassword';
import { IRegister } from './interfaces/IRegister';
import { ISignIn } from './interfaces/ISignIn';

import { url } from './url';

const path = url.user;

class HandUsers {
  signIn = async (body: ISignIn) => {
    return await axiosClient.post(`${path}/login`, { ...body });
  };
  register = async (body: IRegister) => {
    return await axiosAuth.post(`${path}/register/ctv`, { ...body });
  };
  changePassword = async (body: IChangePassword) => {
    return await axiosAuth.post(`${path}/changepwd`, { ...body });
  };
  changeInfo = async (body: IChangeInformation) => {
    return await axiosAuth.post(`${path}/information`, { ...body });
  };
  getInfo = async () => {
    return await axiosAuth.get(`${path}/information`);
  };
}

const handleUsers = new HandUsers();

export default handleUsers;
