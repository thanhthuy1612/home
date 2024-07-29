'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const FormLayout = dynamic(() => import('@/components/layout/FormLayout'), {
  loading: () => <></>,
  ssr: false,
});

const AuthLayout = dynamic(() => import('@/components/layout/AuthLayout'), {
  loading: () => <></>,
  ssr: false,
});

export interface ICreateLayout {
  children: React.ReactNode;
}

const CreateLayout: React.FC<ICreateLayout> = ({ children }) => {
  return (
    <AuthLayout>
      <FormLayout>{children}</FormLayout>
    </AuthLayout>
  );
};

export default CreateLayout;
