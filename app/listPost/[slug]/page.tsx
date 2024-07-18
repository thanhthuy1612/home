'use client';

import {
  resetStateListRoom,
  updateIsLoadingListFilter,
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
const ListPost = ({ params }: { params: { slug: string } }) => {
  const dispatch = useAppDispatch();
  const { fetchData } = useListRoom();

  console.log(params?.slug);

  React.useEffect(() => {
    const initData = () => {
      dispatch(resetStateListRoom());
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

export default ListPost;
