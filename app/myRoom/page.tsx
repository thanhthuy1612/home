'use client';

import { resetStateListRoom } from '@/lib/features/listRoom';
import { useListRoom } from '@/utils/useListRoom';
import dynamic from 'next/dynamic';
import React from 'react';
import { useAppDispatch } from '../../lib/hooks';

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
