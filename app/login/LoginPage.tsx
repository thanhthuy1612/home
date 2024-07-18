'use client';

import React from 'react';
import { Flex, Menu, type MenuProps } from 'antd';
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

const Label = dynamic(() => import('@/components/label/Label'), {
  loading: () => <></>,
  ssr: false,
});

enum LoginMenu {
  LOGIN = 0,
  REGISTER = 1,
}

const LoginPage: React.FC = () => {
  const [auth, setAuth] = React.useState<LoginMenu>(LoginMenu.LOGIN);
  const { width } = useAppSelector((state) => state.login);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(resetStateLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items: MenuProps['items'] = [
    {
      label: (
        <Label
          icon={<LoginOutlined />}
          className=" pl-[15px]"
          title="Đăng nhập"
        />
      ),
      key: LoginMenu.LOGIN,
      style: {
        flexBasis: '50%',
        borderTopLeftRadius: '0.75rem',
      },
    },
    {
      label: (
        <Label
          icon={<UserAddOutlined />}
          className=" pl-[15px]"
          title="Đăng ký"
        />
      ),
      key: LoginMenu.REGISTER,
      style: {
        flexBasis: '50%',
        borderTopRightRadius: '0.75rem',
      },
    },
  ];

  const onClickMenu: MenuProps['onClick'] = (e) => {
    setAuth(Number(e.key));
  };

  const renderBody = () => {
    switch (auth) {
      case LoginMenu.LOGIN:
        return <FormLogin />;
      case LoginMenu.REGISTER:
        return <FormRegister />;
    }
  };

  return (
    <>
      <Menu
        defaultSelectedKeys={[LoginMenu.LOGIN.toString()]}
        onClick={onClickMenu}
        style={{
          display: 'flex',
          backgroundColor: 'transparent',
          borderTopLeftRadius: '0.75rem',
          borderTopRightRadius: '0.75rem',
        }}
        selectedKeys={[auth.toString()]}
        mode="horizontal"
        items={items}
      />
      <Flex className="flex-col m-[48px] items-center justify-center">
        {renderBody()}
      </Flex>
    </>
  );
};

export default LoginPage;
