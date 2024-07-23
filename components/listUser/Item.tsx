'use client';

import { useAppSelector } from '@/lib/hooks';
import { Button, Collapse, Descriptions, DescriptionsProps, Flex } from 'antd';
import React from 'react';
import { IListUser } from '@/interface/IListUser';
import { Role } from '@/enum/Role';
import { useRouter } from 'next/navigation';
import handleAdmin from '@/app/api/HandAdmin';
import { useNotification } from '@/utils/useNotification';

export interface IItem {
  item: IListUser;
  fetchData: (isFirst?: boolean) => Promise<void>;
}
const Item: React.FC<IItem> = (props) => {
  const [items, setItems] = React.useState<DescriptionsProps['items']>([]);
  const { width } = useAppSelector((state) => state.login);
  const { item, fetchData } = props;

  const { setNotification } = useNotification();

  const router = useRouter();

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

  const onClick = () => {
    router.push(`listPost/${item?.id}`);
  };

  const onClickActive = async () => {
    const res = item?.active
      ? await handleAdmin.inactivateUser(item?.id)
      : await handleAdmin.activateUser(item?.id);
    const action = async () => {
      await fetchData(true);
    };
    setNotification(res, 'Cập nhật thành công', action);
  };

  const genExtra = () => {
    return (
      item.role === Role.Saler && (
        <Flex gap={20}>
          <Button onClick={onClick}>Xem danh sách phòng</Button>
          <Button onClick={onClickActive}>
            {item?.active ? 'Khóa tài khoản' : 'Mở tài khoản'}
          </Button>
        </Flex>
      )
    );
  };
  return (
    <div className=" mb-[16px]">
      <Collapse
        collapsible="header"
        defaultActiveKey={[]}
        size="large"
        items={[
          {
            key: item?.id,
            label: item?.username,
            children: (
              <Descriptions items={items} column={{ xs: 1, sm: 1, md: 2 }} />
            ),
            extra: genExtra(),
          },
        ]}
      />
    </div>
  );
};

export default Item;
