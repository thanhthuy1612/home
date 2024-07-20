'use client';

import { Role } from '@/enum/Role';
import {
  resetStateListRoom,
  updateIsLoadingListFilter,
} from '@/lib/features/listRoom';
import { useAppDispatch } from '@/lib/hooks';
import { useListRoom } from '@/utils/useListRoom';
import dynamic from 'next/dynamic';
import React from 'react';

const FilterAdmin = dynamic(() => import('@/components/filter/FilterAdmin'), {
  loading: () => <></>,
  ssr: false,
});

const ListRoom = dynamic(() => import('@/components/listRoom/ListRoom'), {
  loading: () => <></>,
  ssr: false,
});
const ListPost = ({ params }: { params: { slug: string } }) => {
  const dispatch = useAppDispatch();
  const { fetchDataAdmin } = useListRoom();

  React.useEffect(() => {
    const initData = () => {
      dispatch(resetStateListRoom());
      dispatch(updateIsLoadingListFilter(false));
      fetchDataAdmin(params?.slug, true);
    };
    params?.slug && initData();
  }, [params?.slug]);

  return (
    <div>
      <FilterAdmin fetchData={(isFirst?: boolean) => fetchDataAdmin(params?.slug, isFirst)} />
      <ListRoom
        role={Role.Admin}
        title="DANH SÁCH PHÒNG"
        fetchData={(isFirst?: boolean) => fetchDataAdmin(params?.slug, isFirst)}
      />
    </div>
  );
};

export default ListPost;
