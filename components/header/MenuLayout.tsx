'use client';

import React from 'react';
import { Button, Drawer, Menu, MenuProps } from 'antd';
import Logo from './Logo';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Label from '../label/Label';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateWidth } from '@/lib/features/login';
import { menuLayout } from '@/default/menuHeader';

type MenuItem = Required<MenuProps>['items'][number];

const MenuHeader: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = React.useState<string>('');
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const { width } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathname = usePathname();

  const onResize = () => {
    if (typeof window !== 'undefined') {
      dispatch(updateWidth(window.innerWidth * window.devicePixelRatio));
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setSelectedMenu(pathname ?? '/');
  }, [pathname]);

  const initItems: MenuItem[] = menuLayout.map((item) => {
    return {
      key: item.url,
      label: <Label title={item.title} />,
      onClick: () => router.push(item.url),
      style: { display: 'flex', alignItems: 'center' },
    };
  });

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
            style={{ flex: 1, minWidth: 0, height: '64px' }}
            className="border-b-[1px] border-colorPrimary"
          />
        </>
      )}
    </>
  );
};

export default MenuHeader;
