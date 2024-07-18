'use client';

import FormLayout from '@/components/layout/FormLayout';
import dynamic from 'next/dynamic';
import React from 'react';

const Layout = dynamic(() => import('@/components/layout/FormLayout'), {
  loading: () => <></>,
  ssr: false,
});

export interface ICreateLayout {
  children: React.ReactNode;
}

const CreateLayout: React.FC<ICreateLayout> = ({ children }) => {
  return <FormLayout>{children}</FormLayout>;
};

export default Layout;
