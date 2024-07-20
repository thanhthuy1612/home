import {
  FileAddOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface MenuLogin {
  key: string;
  label: string;
  Icon: ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & RefAttributes<HTMLSpanElement>
  >;
}
export const menuUserActive: MenuLogin[] = [
  {
    key: '/settings/profile',
    label: 'Thông tin cá nhân',
    Icon: UserOutlined,
  },
  {
    key: '/settings/password',
    label: 'Thay đổi mật khẩu',
    Icon: KeyOutlined,
  },
  {
    key: '/myRoom',
    label: 'Danh sách quản lý',
    Icon: MenuOutlined,
  },
  {
    key: '/create',
    label: 'Thêm phòng',
    Icon: FileAddOutlined,
  },
  {
    key: 'out',
    label: 'Thoát',
    Icon: LogoutOutlined,
  },
];

export const menuAdmin: MenuLogin[] = [
  {
    key: '/settings/profile',
    label: 'Thông tin cá nhân',
    Icon: UserOutlined,
  },
  {
    key: '/settings/password',
    label: 'Thay đổi mật khẩu',
    Icon: KeyOutlined,
  },
  {
    key: '/create',
    label: 'Thêm phòng',
    Icon: FileAddOutlined,
  },
  {
    key: '/listPost',
    label: 'Danh sách phòng',
    Icon: MenuOutlined,
  },
  {
    key: '/listUser',
    label: 'Danh sách người dùng',
    Icon: UserSwitchOutlined,
  },
  {
    key: 'out',
    label: 'Thoát',
    Icon: LogoutOutlined,
  },
];

export const menuUser: MenuLogin[] = [
  {
    key: '/settings/profile',
    label: 'Thông tin cá nhân',
    Icon: UserOutlined,
  },
  {
    key: '/settings/password',
    label: 'Thay đổi mật khẩu',
    Icon: KeyOutlined,
  },
  {
    key: 'out',
    label: 'Thoát',
    Icon: LogoutOutlined,
  },
];
