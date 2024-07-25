'use client';

import { Role } from '@/enum/Role';
import { useAppSelector } from '@/lib/hooks';
import { Button, Empty, List } from 'antd';
import dynamic from 'next/dynamic';
import React from 'react';
import LoadingSpin from '../loading/LoadingSpin';

const ItemCard = dynamic(() => import('./ItemCard'), {
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
          onClick={
            isLoadingListRoom && listRoom.length !== 0 ? () => {} : onLoadMore
          }
        >
          {isLoadingListRoom && listRoom.length !== 0 ? (
            <LoadingSpin />
          ) : (
            'Xem thêm'
          )}
        </Button>
      </div>
    ) : null;

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 5,
      }}
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
      renderItem={(item) => (
        <List.Item>
          <ItemCard item={item} role={role} fetchData={fetchData} />
        </List.Item>
      )}
    />
  );
};

export default ListItem;
