'use client';

import React from 'react';
import { Button, Drawer, Menu, MenuProps, theme } from 'antd';
import Logo from './Logo';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Label from '../label/Label';
import { updateWidth } from '@/lib/features/login';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

type MenuItem = Required<MenuProps>['items'][number];

const MenuHeader: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = React.useState<string>('');
  const [collapsed, setCollapsed] = React.useState(false);
  const { width } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathname = usePathname();

  const onResize = () => {
    dispatch(updateWidth(window.innerWidth * window.devicePixelRatio));
  };

  React.useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setSelectedMenu(pathname ?? '/');
  }, [pathname]);

  const initItems: MenuItem[] = [
    {
      key: '/',
      label: <Label title="Trang chủ" />,
      onClick: () => router.push('/'),
    },
    {
      key: '/introduce',
      label: <Label title="Về chúng tôi" />,
      onClick: () => router.push('/introduce'),
    },
    {
      key: '/saler',
      label: <Label title="Đối tác" />,
      onClick: () => router.push('/saler'),
    },
    {
      key: '/contact',
      label: <Label title="Liên hệ" />,
      onClick: () => router.push('/contact'),
    },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {width < 800 ? (
        <>
          <Button type="primary" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Drawer
            placement="left"
            title="HOME.VN"
            onClose={() => setCollapsed(false)}
            open={collapsed}
          >
            <Menu
              mode="inline"
              items={initItems}
              selectedKeys={[selectedMenu ?? '']}
              style={{ flex: 1, minWidth: 0 }}
            />
          </Drawer>
          <Logo />
        </>
      ) : (
        <>
          <Logo />
          <Menu
            mode="horizontal"
            items={initItems}
            selectedKeys={[selectedMenu ?? '']}
            style={{ flex: 1, minWidth: 0 }}
          />
        </>
      )}
    </>
  );
};

export default MenuHeader;
