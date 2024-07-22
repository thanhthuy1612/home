import React from 'react';
import ErrorAuthorized from '../error/ErrorAuthorized';

export interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  // Perform localStorage action
  let accessToken;
  if (typeof window !== 'undefined') {
    accessToken = localStorage?.getItem('token');
  }
  return !accessToken ? <ErrorAuthorized /> : children;
};

export default AuthLayout;
