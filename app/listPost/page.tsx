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
const ListPost = () => {
  const dispatch = useAppDispatch();
  const { fetchDataAdmin } = useListRoom();

  React.useEffect(() => {
    const initData = () => {
      dispatch(resetStateListRoom());
      dispatch(updateIsLoadingListFilter(false));
      fetchDataAdmin(null, true);
    };
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <FilterAdmin
        fetchData={(isFirst?: boolean) => fetchDataAdmin(null, isFirst)}
      />
      <ListRoom
        isAdd
        role={Role.Admin}
        title="DANH SÁCH PHÒNG"
        fetchData={(isFirst?: boolean) => fetchDataAdmin(null, isFirst)}
      />
    </div>
  );
};

export default ListPost;
