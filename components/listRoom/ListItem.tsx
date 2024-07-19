'use client';

import React from 'react';
import { Button, Empty, List } from 'antd';
import LoadingSpin from '../loading/LoadingSpin';
import { useAppSelector } from '@/lib/hooks';
import dynamic from 'next/dynamic';
import { Role } from '@/enum/Role';

const Item = dynamic(() => import('./Item'), {
  loading: () => <></>,
  ssr: false,
});

export interface IListItem {
  fetchData: (isFirst?: boolean) => Promise<void>;
  role?: Role;
}

const ListItem: React.FC<IListItem> = (props) => {
  const { fetchData, role } = props;

  const { isLoadingListRoom, isInitLoadingListRoom, listRoom, totalListRoom } =
    useAppSelector((state) => state.listRoom);

  const onLoadMore = async () => {
    await fetchData();
    window.dispatchEvent(new Event('resize'));
  };

  const loadMore =
    listRoom.length < totalListRoom ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button
          disabled={isLoadingListRoom}
          className=" w-[200px]"
          onClick={onLoadMore}
        >
          {isLoadingListRoom ? <LoadingSpin /> : 'Xem thêm'}
        </Button>
      </div>
    ) : null;

  return (
    <List
      loading={isInitLoadingListRoom}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={listRoom}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Không có dữ liệu"
          />
        ),
      }}
      renderItem={(item) => <Item item={item} role={role} />}
    />
  );
};

export default ListItem;
