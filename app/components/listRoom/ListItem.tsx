'use client';

import React from 'react';
import { Button, List } from 'antd';
import Item from './Item';
import LoadingSpin from '../loading/LoadingSpin';
import { useAppSelector } from '@/lib/hooks';

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
          className=" w-[200px] mb-[24px]"
          onClick={onLoadMore}
        >
          {isLoadingListRoom ? <LoadingSpin /> : 'Xem thêm'}
        </Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={isInitLoadingListRoom}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={listRoom}
      renderItem={(item) => (
        <Item
          src={item.picture.large}
          title={'Phòng 12345'}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          id={item.name?.last}
          cost={4000000}
          address="699 Phạm Văn Bạch, Phường 12, Gò Vấp"
          people={2}
          isMyAccount={isMyAccount}
        />
      )}
    />
  );
};

export default ListItem;
