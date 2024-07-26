import { Flex } from 'antd';
import React from 'react';
import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

export interface IListUser {
  title: string;
  fetchData: (isFirst?: boolean) => Promise<void>;
}

const ListItem = dynamic(() => import('./ListItem'), {
  loading: () => <Loading />,
  ssr: false,
});

const ListUser: React.FC<IListUser> = (props) => {
  const { title, fetchData } = props;

  return (
    <div className="px-[24px] mb-[24px]">
      <Flex className=" items-center justify-between py-[24px]">
        <div className=" font-[600] text-[20px] w-fit">{title}</div>
      </Flex>
      <ListItem fetchData={fetchData} />
    </div>
  );
};

export default ListUser;
