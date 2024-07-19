'use client';

import handlePosts from '@/app/api/HandPosts';
import React from 'react';

const Product = ({ params }: { params: { slug: string } }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const fetch = async () => {
      const res = await handlePosts.getPost(params?.slug);
      console.log(res);
    };
    params?.slug && fetch();
  }, [params]);
  return <></>;
};

export default Product;
