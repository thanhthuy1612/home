'use client';

import React from 'react';
import { Tabs, theme } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { resetStateLogin } from '@/lib/features/login';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

const FormLogin = dynamic(() => import('./components/FormLogin'), {
  loading: () => <></>,
  ssr: false,
});

const FormRegister = dynamic(() => import('./components/FormRegister'), {
  loading: () => <></>,
  ssr: false,
});

enum LoginMenu {
  LOGIN = 'Login',
  REGISTER = 'Register',
}

const LoginPage: React.FC = () => {
  const { width } = useAppSelector((state) => state.login);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(resetStateLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemsTab = [
    {
      label: 'Đăng nhập',
      icon: <LoginOutlined />,
      key: LoginMenu.LOGIN,
      children: (
        <div className=" p-[16px]">
          <FormLogin />
        </div>
      ),
    },
    {
      label: 'Đăng ký',
      icon: <UserAddOutlined />,
      key: LoginMenu.REGISTER,
      children: (
        <div className=" p-[16px]">
          <FormRegister />
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        margin: 0,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        width: width < 1600 ? '100%' : '800px',
      }}
      className=" shadow-2xl"
    >
      <Tabs
        size="large"
        defaultActiveKey={LoginMenu.LOGIN}
        items={itemsTab}
        tabBarStyle={{ padding: '0 16px' }}
      />
    </div>
  );
};

export default LoginPage;
