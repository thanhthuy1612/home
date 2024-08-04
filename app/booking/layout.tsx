'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const AuthLayout = dynamic(() => import('@/components/layout/AuthLayout'), {
  loading: () => <></>,
  ssr: false,
});

export interface ICreateLayout {
  children: React.ReactNode;
}

const CreateLayout: React.FC<ICreateLayout> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default CreateLayout;
