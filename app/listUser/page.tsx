'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useAppDispatch } from '@/lib/hooks';
import { useListUser } from '@/utils/useListUser';
import { resetStateListUser } from '@/lib/features/listUser';

const FilterListUser = dynamic(
  () => import('@/components/filter/FilterListUser'),
  {
    loading: () => <></>,
    ssr: false,
  },
);

const ListUser = dynamic(() => import('@/components/listUser/ListUser'), {
  loading: () => <></>,
  ssr: false,
});

const ListUserPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fetchDataUser } = useListUser();
  React.useEffect(() => {
    const initData = () => {
      dispatch(resetStateListUser());
      fetchDataUser(true);
    };
    initData();
  }, []);

  return (
    <div>
      <FilterListUser fetchData={fetchData} />
      <ListUser title="Danh sách người dùng" fetchData={fetchDataUser} />
    </div>
  );
};
export default ListUserPage;
