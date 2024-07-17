'use client';

import React from 'react';
import { Avatar, Button, Dropdown, MenuProps } from 'antd';
import {
  FileAddOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import LoadingSpin from '../loading/LoadingSpin';
import { useRouter, usePathname } from 'next/navigation';
import { resetStateUser, updateUser } from '@/lib/features/user';
import { updateIsLoadingPage } from '@/lib/features/reload';
import { IStatusCode } from '@/interface/IStatusCode';
import handleUsers from '@/app/api/HandUsers';

const LoginButton: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const { isLoadingPage } = useAppSelector((state) => state.reload);
  const { id } = useAppSelector((state) => state.user);

  const onClickLogout = () => {
    dispatch(resetStateUser());
    // Perform localStorage action
    localStorage.clear();
    router.push('/');
  };

  async function isConnected() {
    dispatch(updateIsLoadingPage(true));
    const res = await handleUsers.getInfo();
    console.log(res);
    if (res.status === IStatusCode.SUCCESS) {
      console.log(1);
      dispatch(updateUser(res.data));
    } else {
      dispatch(updateUser({ id: '' }));
      localStorage.clear();
    }
    dispatch(updateIsLoadingPage(false));
  }

  React.useEffect(() => {
    isConnected();
  }, []);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (pathname === e.key) {
      return;
    }
    switch (e.key) {
      case '/settings/profile':
        router.push(e.key);
        break;
      case '/settings/password':
        router.push(e.key);
        break;
      case '/myRoom':
        router.push(e.key);
        break;
      case '/create':
        router.push(e.key);
        break;
      case 'out':
        onClickLogout();
        break;
    }
  };

  const items = [
    {
      key: '/settings/profile',
      label: 'Thông tin cá nhân',
      icon: <UserOutlined />,
    },
    {
      key: '/settings/password',
      label: 'Thay đổi mật khẩu',
      icon: <KeyOutlined />,
    },
    {
      key: '/myRoom',
      label: 'Danh sách quản lý',
      icon: <MenuOutlined />,
    },
    {
      key: '/create',
      label: 'Thêm phòng',
      icon: <FileAddOutlined />,
    },
    {
      key: 'out',
      label: 'Thoát',
      icon: <LogoutOutlined />,
    },
  ];

  const onClickLogin = () => {
    router.push('/login');
  };

  const renderButtonLogin = () => {
    return !id ? (
      <Button
        type="primary"
        className=" hover:!bg-colorSelect"
        onClick={onClickLogin}
      >
        Đăng nhập
      </Button>
    ) : (
      <Dropdown
        menu={{ items, onClick: handleMenuClick, style: { minWidth: '200px' } }}
        arrow
      >
        <Avatar
          className=" bg-bgColor text-colorPrimary m-[10px] border-[1px] border-colorPrimary"
          src={undefined}
          icon={<UserOutlined />}
        />
      </Dropdown>
    );
  };

  return (
    <div className="flex items-center">
      {isLoadingPage ? <LoadingSpin /> : renderButtonLogin()}
    </div>
  );
};
export default LoginButton;
