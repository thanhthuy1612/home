'use client';

import React from 'react';
import { Button, Empty, List } from 'antd';
import LoadingSpin from '../loading/LoadingSpin';
import { useAppSelector } from '@/lib/hooks';
import dynamic from 'next/dynamic';

const Item = dynamic(() => import('./Item'), {
  loading: () => <></>,
  ssr: false,
});

export interface IListItem {
  fetchData: (isFirst?: boolean) => Promise<void>;
}

const ListItem: React.FC<IListItem> = (props) => {
  const { fetchData } = props;

  const { isInitLoadingListUser, isLoadingListUser, totalListUser, listUser } =
    useAppSelector((state) => state.listUser);

  const onLoadMore = async () => {
    await fetchData();
    window.dispatchEvent(new Event('resize'));
  };

  const loadMore =
    listUser.length < totalListUser ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button
          disabled={isLoadingListUser}
          className=" w-[200px]"
          onClick={
            isLoadingListUser && listUser.length !== 0 ? () => {} : onLoadMore
          }
        >
          {isLoadingListUser && listUser.length !== 0 ? (
            <LoadingSpin />
          ) : (
            'Xem thêm'
          )}
        </Button>
      </div>
    ) : null;

  return (
    <List
      loading={isInitLoadingListUser}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={listUser}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Không có dữ liệu"
          />
        ),
      }}
      renderItem={(item) => <Item item={item} fetchData={fetchData} />}
    />
  );
};

export default ListItem;
