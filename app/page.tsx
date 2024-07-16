'use client';

import Filter from '@/components/filter/Filter';
import ListRoom from '@/components/listRoom/ListRoom';
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
import React from 'react';

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
    <>
      <Filter />
      <ListRoom title="DANH SÁCH PHÒNG" fetchData={fetchData} />
    </>
  );
};

export default Home;
