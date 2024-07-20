import React from 'react';
import ErrorAuthorized from '../error/ErrorAuthorized';

export interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  const accessToken = localStorage?.getItem('token');
  return !accessToken ? <ErrorAuthorized /> : children;
};

export default AuthLayout;
