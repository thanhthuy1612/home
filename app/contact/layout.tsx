'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const FormLayout = dynamic(() => import('@/components/layout/FormLayout'), {
  loading: () => <></>,
  ssr: false,
});
export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return <FormLayout>{children}</FormLayout>;
};

export default Layout;
