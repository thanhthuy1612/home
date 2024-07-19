'use client';

import React, { act } from 'react';
import { Avatar, Button, Dropdown, MenuProps, Tooltip } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import LoadingSpin from '../loading/LoadingSpin';
import { useRouter, usePathname } from 'next/navigation';
import { resetStateUser, updateUser } from '@/lib/features/user';
import { updateIsLoadingPage } from '@/lib/features/reload';
import { IStatusCode } from '@/interface/IStatusCode';
import handleUsers from '@/app/api/HandUsers';
import {
  menuAdmin,
  MenuLogin,
  menuUser,
  menuUserActive,
} from '@/default/menuLogin';
import { ItemType } from 'antd/es/menu/interface';
import { Role } from '@/enum/Role';

const LoginButton: React.FC = () => {
  const [items, setItems] = React.useState<ItemType[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const { isLoadingPage } = useAppSelector((state) => state.reload);
  const { id, active, role } = useAppSelector((state) => state.user);
  const { width } = useAppSelector((state) => state.login);

  const onClickLogout = () => {
    dispatch(resetStateUser());
    // Perform localStorage action
    localStorage.clear();
    router.push('/');
  };

  async function isConnected() {
    dispatch(updateIsLoadingPage(true));
    const res = await handleUsers.getInfo();
    if (res?.status === IStatusCode.SUCCESS) {
      dispatch(updateUser(res.data));
    } else {
      dispatch(updateUser({ id: '' }));
      localStorage.clear();
    }
    dispatch(updateIsLoadingPage(false));
  }

  React.useEffect(() => {
    const checkMenu = () => {
      let menu: MenuLogin[] = [];
      if (role === Role.Admin) {
        menu = menuAdmin;
      }
      if (role === Role.Saler) {
        menu = active ? menuUserActive : menuUser;
      }
      setItems(
        menu.map((item) => {
          return { key: item.key, label: item.label, icon: <item.Icon /> };
        }),
      );
    };
    id && checkMenu();
  }, [id]);

  React.useEffect(() => {
    isConnected();
  }, []);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (pathname === e.key) {
      return;
    }
    if (e.key === 'out') {
      onClickLogout();
    } else {
      router.push(e.key);
    }
  };

  const onClickLogin = () => {
    router.push('/login');
  };

  const renderLogin = () => {
    return width < 1600 ? (
      <Tooltip title="Đăng nhập">
        <Button
          className=" rounded-[50%] border-[1px] border-colorPrimary"
          icon={<LoginOutlined />}
          onClick={onClickLogin}
        ></Button>
      </Tooltip>
    ) : (
      <Button
        type="primary"
        className=" hover:!bg-colorSelect"
        onClick={onClickLogin}
      >
        Đăng nhập
      </Button>
    );
  };
  const renderButtonLogin = () => {
    return !id ? (
      renderLogin()
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
