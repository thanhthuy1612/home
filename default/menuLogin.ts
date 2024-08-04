import {
  FileAddOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuOutlined,
  ReadOutlined,
  UserAddOutlined,
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
    key: '/myHold',
    label: 'Danh sách phòng đang giữ',
    Icon: MenuOutlined,
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
  // {
  //   key: '/listPost',
  //   label: 'Danh sách phòng',
  //   Icon: MenuOutlined,
  // },
  {
    key: '/hold',
    label: 'Danh sách giữ phòng',
    Icon: MenuOutlined,
  },
  {
    key: '/booking',
    label: 'Danh sách đặt phòng',
    Icon: ReadOutlined,
  },
  {
    key: '/listUser',
    label: 'Danh sách người dùng',
    Icon: UserSwitchOutlined,
  },
  {
    key: '/register',
    label: 'Thêm công tác viên',
    Icon: UserAddOutlined,
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
    key: 'out',
    label: 'Thoát',
    Icon: LogoutOutlined,
  },
];
