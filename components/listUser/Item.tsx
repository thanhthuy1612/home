'use client';

import { useAppSelector } from '@/lib/hooks';
import {
  Button,
  Collapse,
  Descriptions,
  DescriptionsProps,
  Flex,
  Image,
} from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';
import { IListUser } from '@/interface/IListUser';

export interface IItem {
  item: IListUser;
}
const Item: React.FC<IItem> = (props) => {
  const [items, setItems] = React.useState<DescriptionsProps['items']>([]);
  const { width } = useAppSelector((state) => state.login);
  const { item } = props;

  const router = useRouter();
  React.useEffect(() => {
    const initState = [
      {
        key: '1',
        label: 'Họ tên',
        children: item.fullname,
      },
      {
        key: '2',
        label: 'email',
        children: item.email,
      },
      {
        key: '3',
        label: 'Số điện thoại',
        children: item.phone,
      },
      {
        key: '4',
        label: 'Facebook',
        children: item.facebook,
      },
      {
        key: '3',
        label: 'Zalo',
        children: item.zalo,
      },
      {
        key: '3',
        label: 'Số điện thoại',
        children: item.phone,
      },
    ];
    setItems(initState);
  }, []);

  return (
    <>
      <Collapse
        collapsible="header"
        defaultActiveKey={[item.id]}
        items={[
          {
            key: item.id,
            label: 'This panel can only be collapsed by clicking text',
            children: (
              <Flex
                className=" flex-col justify-between"
                style={{ width: width < 1600 ? '100%' : 'calc(100% - 240px)' }}
              >
                <Descriptions
                  title={item.username}
                  items={items}
                  column={{ xs: 1, sm: 1, md: 2 }}
                />
                <Button>Sửa</Button>
              </Flex>
            ),
          },
        ]}
      />
    </>
  );
};

export default Item;
