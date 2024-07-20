'use client';

import AuthLayout from '@/components/layout/AuthLayout';
import React from 'react';

export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
