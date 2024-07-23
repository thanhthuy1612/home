'use client';

import React from 'react';
import ErrorAuthorized from '../error/ErrorAuthorized';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/app/loading';

export interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  const { isLoadingPage } = useAppSelector((state) => state.reload);

  let accessToken;
  if (typeof window !== 'undefined') {
    accessToken = localStorage?.getItem('token');
  }
  if (isLoadingPage) {
    return <Loading />;
  }
  return !accessToken ? <ErrorAuthorized /> : children;
};

export default AuthLayout;
