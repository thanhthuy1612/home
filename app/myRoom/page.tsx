'use client';

import React from 'react';
import { useAppDispatch } from '../../lib/hooks';
import {
  resetStateListRoom,
  updateIsLoadingListFilter,
  updateListCost,
  updateListLocation,
  updateListType,
} from '@/lib/features/listRoom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useListRoom } from '@/utils/useListRoom';
import { ISelected } from '@/interface/ISelected';
import dynamic from 'next/dynamic';

const Filter = dynamic(() => import('@/components/filter/Filter'), {
  loading: () => <></>,
  ssr: false,
});

const ListRoom = dynamic(() => import('@/components/listRoom/ListRoom'), {
  loading: () => <></>,
  ssr: false,
});

const mock: ISelected[] = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'Yiminghe', label: 'yiminghe' },
  { value: 'disabled', label: 'Disabled', disabled: true },
];
const MyRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { fetchData } = useListRoom();
  React.useEffect(() => {
    const initData = () => {
      dispatch(resetStateListRoom());
      dispatch(updateIsLoadingListFilter(true));
      dispatch(updateListCost(mock));
      dispatch(updateListLocation(mock));
      dispatch(updateListType(mock));
      dispatch(updateIsLoadingListFilter(false));
      fetchData(true);
    };
    initData();
  }, []);

  return (
    <>
      <Filter />
      <div>
        <Button
          icon={<PlusOutlined />}
          className=" mt-[24px] mx-[48px]"
          size="large"
          onClick={() => router.push('/create')}
        >
          Thêm phòng mới
        </Button>
      </div>
      <ListRoom
        isMyAccount={true}
        title="DANH SÁCH PHÒNG QUẢN LÝ"
        fetchData={fetchData}
      />
    </>
  );
};

export default MyRoom;
