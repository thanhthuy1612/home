'use client';

import { Layout, theme } from 'antd';
import React from 'react';
import dynamic from 'next/dynamic';
import { Roboto } from '@next/font/google';

export interface IDefaultLayout {
  children: React.ReactNode;
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['italic', 'normal'],
});

const HeaderLayout = dynamic(() => import('../header/HeaderLayout'), {
  loading: () => <></>,
  ssr: false,
});

const FooterLayout = dynamic(() => import('../footer/FooterLayout'), {
  loading: () => <></>,
  ssr: false,
});

const { Content } = Layout;

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className={roboto.className}>
      <HeaderLayout />
      <Content
        style={{
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          backgroundColor: colorBgContainer,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {children}
        <FooterLayout />
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
