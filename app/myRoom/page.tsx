'use client';

import { ISelected } from '@/interface/ISelected';
import {
  resetStateListRoom,
  updateIsLoadingListFilter,
  updateListCost,
  updateListLocation,
  updateListType,
} from '@/lib/features/listRoom';
import { useListRoom } from '@/utils/useListRoom';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAppDispatch } from '../../lib/hooks';


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
  const { fetchDataPostMe } = useListRoom();
  React.useEffect(() => {
    const initData = () => {
      dispatch(resetStateListRoom());
      dispatch(updateIsLoadingListFilter(true));
      dispatch(updateListCost(mock));
      dispatch(updateListLocation(mock));
      dispatch(updateListType(mock));
      dispatch(updateIsLoadingListFilter(false));
      fetchDataPostMe(true);
    };
    initData();
  }, []);

  return (
    <div>
      <ListRoom
        isMyAccount={true}
        title="DANH SÁCH PHÒNG QUẢN LÝ"
        fetchData={fetchDataPostMe}
      />
    </div>
  );
};

export default MyRoom;
