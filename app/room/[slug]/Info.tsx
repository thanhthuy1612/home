'use client';

import { Role } from '@/enum/Role';
import { IListUser } from '@/interface/IListUser';
import { Descriptions, DescriptionsProps } from 'antd';
import React from 'react';

export interface IInfo {
  item?: IListUser;
  className: string;
}
const Info: React.FC<IInfo> = ({ item, className }) => {
  const [items, setItems] = React.useState<DescriptionsProps['items']>([]);
  React.useEffect(() => {
    const initState = [
      {
        key: '0',
        label: 'Tài khoản',
        children: item?.username,
      },
      {
        key: '1',
        label: 'Họ tên',
        children: item?.fullname,
      },
      {
        key: '2',
        label: 'email',
        children: item?.email,
      },
      {
        key: '3',
        label: 'Số điện thoại',
        children: item?.phone,
      },
      {
        key: '4',
        label: 'Facebook',
        children: item?.facebook,
      },
      {
        key: '5',
        label: 'Zalo',
        children: item?.zalo,
      },
      {
        key: '6',
        label: 'Trạng thái tào khoản',
        children: item?.active ? 'Đã kích hoạt' : 'Chưa kích hoạt',
      },
      {
        key: '7',
        label: 'Vai trò',
        children: item?.role === Role.Admin ? 'Admin' : 'Saler',
      },
    ];
    setItems(initState);
  }, [item]);
  return (
    <div className={className}>
      <div className=" font-[600] mb-[8px] border-b-[1px] w-fit border-colorSelect">
        THÔNG TIN LIÊN LẠC NGƯỜI ĐĂNG BÀI
      </div>
      <Descriptions items={items} column={{ xs: 1, sm: 1, md: 2 }} />
    </div>
  );
};

export default Info;
