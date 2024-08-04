'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const AuthLayout = dynamic(() => import('@/components/layout/AuthLayout'), {
  loading: () => <></>,
  ssr: false,
});
export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
