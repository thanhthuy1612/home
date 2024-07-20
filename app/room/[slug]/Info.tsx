'use client';

import { Role } from '@/enum/Role';
import { IListUser } from '@/interface/IListUser';
import { Collapse, Descriptions, DescriptionsProps, Flex } from 'antd';
import React from 'react';

export interface IInfo {
  item?: IListUser;
}
const Info: React.FC<IInfo> = ({ item }) => {
  const [items, setItems] = React.useState<DescriptionsProps['items']>([]);

  React.useEffect(() => {
    const initState = [
      {
        key: '1',
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
    <div>
      <Collapse
        collapsible="header"
        defaultActiveKey={[item?.id ?? '']}
        activeKey={[item?.id ?? '']}
        size="large"
        items={[
          {
            key: item?.id,
            label: 'Thông tin liên lạc',
            children: (
              <Descriptions items={items} column={{ xs: 1, sm: 1, md: 2 }} />
            ),
          },
        ]}
      />
    </div>
  );
};

export default Info;
