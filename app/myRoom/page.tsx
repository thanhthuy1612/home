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
  const { fetchDataPostMe } = useListRoom();
  React.useEffect(() => {
    const initData = () => {
      dispatch(resetStateListRoom());
      fetchDataPostMe(true);
    };
    initData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ListRoom
        role={Role.Saler}
        title="DANH SÁCH PHÒNG QUẢN LÝ"
        fetchData={fetchDataPostMe}
      />
    </div>
  );
};

export default MyRoom;
