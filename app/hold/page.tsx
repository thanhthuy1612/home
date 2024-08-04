'use client';

import { resetStateListRoom } from '@/lib/features/listRoom';
import { useListRoom } from '@/utils/useListRoom';
import dynamic from 'next/dynamic';
import React from 'react';
import { useAppDispatch } from '../../lib/hooks';
import { Role } from '@/enum/Role';

const FilterListAdminHold = dynamic(
  () => import('@/components/filter/FilterListAdminHold'),
  {
    loading: () => <></>,
    ssr: false,
  },
);
const ListRoom = dynamic(() => import('@/components/listRoom/ListRoom'), {
  loading: () => <></>,
  ssr: false,
});
const MyRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fetchDataAdminHold } = useListRoom();
  React.useEffect(() => {
    const initData = () => {
      dispatch(resetStateListRoom());
      fetchDataAdminHold(true);
    };
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <FilterListAdminHold fetchData={fetchDataAdminHold} />
      <ListRoom
        role={Role.Admin}
        title="DANH SÁCH PHÒNG ĐANG GIỮ"
        fetchData={fetchDataAdminHold}
      />
    </div>
  );
};

export default MyRoom;
