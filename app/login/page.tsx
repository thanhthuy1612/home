'use client';

import React from 'react';
import { Flex, Menu, type MenuProps } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { resetStateLogin } from '@/lib/features/login';
import { useAppDispatch } from '@/lib/hooks';

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

const Login: React.FC = () => {
  const [auth, setAuth] = React.useState<LoginMenu>(LoginMenu.LOGIN);

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
    <Flex className=" min-h-[100%] w-[100%] items-center justify-center bg-borderHeader">
      <div className=" min-w-[600px] my-[48px]  bg-bgColor rounded-xl shadow-2xl">
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
        <Flex className=" flex-col my-[50px] mx-[100px] items-center justify-center">
          {renderBody()}
        </Flex>
      </div>
    </Flex>
  );
};

export default Login;
