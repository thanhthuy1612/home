'use client';

import { resetStateListRoom } from '@/lib/features/listRoom';
import { useListRoom } from '@/utils/useListRoom';
import dynamic from 'next/dynamic';
import React from 'react';
import { useAppDispatch } from '../../lib/hooks';
import { Role } from '@/enum/Role';

const ListRoom = dynamic(() => import('@/components/listRoom/ListRoom'), {
  loading: () => <></>,
  ssr: false,
});
const MyRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fetchDataHold } = useListRoom();
  React.useEffect(() => {
    const initData = () => {
      dispatch(resetStateListRoom());
      fetchDataHold(true);
    };
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ListRoom
        role={Role.Saler}
        title="DANH SÁCH PHÒNG ĐANG GIỮ"
        fetchData={fetchDataHold}
      />
    </div>
  );
};

export default MyRoom;
