'use client';

import handlePosts from '@/app/api/HandPosts';
import React from 'react';
import Loading from './loading';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/lib/hooks';
import { Role } from '@/enum/Role';
import handleAdmin from '@/app/api/HandAdmin';
import { IPost } from '@/interface/IPost';

const Product = dynamic(() => import('./Product'), {
  loading: () => <></>,
  ssr: false,
});

const RoomPage = ({ params }: { params: { slug: string } }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [data, setData] = React.useState<IPost>();
  const { role } = useAppSelector((state) => state.user);
  React.useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res =
        role === Role.Admin
          ? await handleAdmin.getPostAdmin(params?.slug)
          : await handlePosts.getPost(params?.slug);
      setData(res?.data);
      setIsLoading(false);
    };
    params?.slug && fetch();
  }, [params, role]);
  return <>{isLoading || !data?.id ? <Loading /> : <Product item={data} />}</>;
};

export default RoomPage;
