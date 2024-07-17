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
  fetchData: () => Promise<void>;
  isMyAccount?: boolean;
}

const ListItem: React.FC<IListItem> = (props) => {
  const { fetchData, isMyAccount } = props;

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
      renderItem={(item) => (
        <Item
          src={item?.previewPicture}
          title={item?.title}
          description={item?.description}
          id={item?.id}
          cost={item?.price}
          address={item?.address}
          people={item?.maxPeople}
          isMyAccount={isMyAccount}
        />
      )}
    />
  );
};

export default ListItem;
