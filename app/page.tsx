'use client';

import { resetStateListRoom } from '@/lib/features/listRoom';
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

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fetchData } = useListRoom();

  React.useEffect(() => {
    const initData = () => {
      dispatch(resetStateListRoom());
      fetchData(true);
    };
    initData();
  }, []);

  return (
    <div>
      <CarouselHome />
      <Filter fetchData={fetchData} />
      <ListRoom title="DANH SÁCH PHÒNG" fetchData={fetchData} />
    </div>
  );
};

export default Home;
