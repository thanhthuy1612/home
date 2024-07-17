'use client';

import { ISelected } from '@/interface/ISelected';
import {
  resetStateListRoom,
  updateIsLoadingListFilter,
  updateListCost,
  updateListLocation,
  updateListType,
} from '@/lib/features/listRoom';
import { useAppDispatch } from '@/lib/hooks';
import { useListRoom } from '@/utils/useListRoom';
import dynamic from 'next/dynamic';
import React from 'react';

const CarouselHome = dynamic(
  () => import('@/components/carouselHome/CarouselHome'),
  {
    loading: () => <></>,
    ssr: false,
  },
);

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
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
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
    <div>
      <CarouselHome />
      <Filter />
      <ListRoom title="DANH SÁCH PHÒNG" fetchData={fetchData} />
    </div>
  );
};

export default Home;
