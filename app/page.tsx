'use client';

import { Role } from '@/enum/Role';
import { resetStateListRoom } from '@/lib/features/listRoom';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
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

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fetchData } = useListRoom();
  const { role } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    const initData = () => {
      dispatch(resetStateListRoom());
      fetchData(true);
    };
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CarouselHome />
      <Filter fetchData={fetchData} />
      <ListRoom
        isAdd={role === Role.Admin}
        role={role}
        title="DANH SÁCH PHÒNG"
        fetchData={fetchData}
      />
    </div>
  );
};

export default Home;
