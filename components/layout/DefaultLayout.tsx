'use client';

import { Layout, theme } from 'antd';
import React from 'react';
import dynamic from 'next/dynamic';

export interface IDefaultLayout {
  children: React.ReactNode;
}

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
    <Layout>
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
