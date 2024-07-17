import axiosAuth from './axiosAuth';
import axiosClient from './axiosClient';
import { IChangePassword } from './interfaces/IChangePassword';
import { ISignIn } from './interfaces/ISignIn';

import { url } from './url';

const path = url.user;

class HandUsers {
  signIn = async (body: ISignIn) => {
    return await axiosClient.post(`${path}/login`, { ...body });
  };
  changePassword = async (body: IChangePassword) => {
    return await axiosAuth.post(`${path}/changepwd`, { ...body });
  };
}

const handleUsers = new HandUsers();

export default handleUsers;
