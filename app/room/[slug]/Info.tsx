'use client';

import { Role } from '@/enum/Role';
import { IListUser } from '@/interface/IListUser';
import { Descriptions, DescriptionsProps } from 'antd';
import React from 'react';

export interface IInfo {
  item?: IListUser;
  className: string;
  title: string;
}
const Info: React.FC<IInfo> = ({ item, className, title }) => {
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
        children: (
          <div
            className="ml-10px  cursor-pointer hover:text-colorSelect"
            onClick={() => {
              window.location.href = `mailto:${item?.email}`;
            }}
          >
            {item?.email}
          </div>
        ),
      },
      {
        key: '3',
        label: 'Số điện thoại',
        children: (
          <div
            className="ml-10px  cursor-pointer hover:text-colorSelect"
            onClick={async () => {
              if (item?.phone) {
                await navigator.clipboard.writeText(item?.phone);
              }
            }}
          >
            {item?.phone}
          </div>
        ),
      },
      {
        key: '4',
        label: 'Facebook',
        children: (
          <div
            className="ml-10px  cursor-pointer hover:text-colorSelect"
            onClick={async () => {
              if (item?.facebook) {
                window.location.href = item?.facebook;
              }
            }}
          >
            {item?.facebook}
          </div>
        ),
      },
      {
        key: '5',
        label: 'Zalo',
        children: (
          <div
            className="ml-10px  cursor-pointer hover:text-colorSelect"
            onClick={() => {
              if (item?.zalo) {
                window.location.href = item?.zalo;
              }
            }}
          >
            {item?.zalo}
          </div>
        ),
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
        {title}
      </div>
      <Descriptions items={items} column={{ xs: 1, sm: 1, md: 2 }} />
    </div>
  );
};

export default Info;
