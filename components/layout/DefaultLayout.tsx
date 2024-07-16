'use client';

import { Layout, theme } from 'antd';
import React from 'react';
import HeaderLayout from '../header/HeaderLayout';

export interface IDefaultLayout {
  children: React.ReactNode;
}

const { Content } = Layout;

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <HeaderLayout />
      <Content style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', backgroundColor: colorBgContainer }}>
        {children}
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
