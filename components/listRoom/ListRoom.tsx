'use client';

import { Flex } from 'antd';
import React from 'react';
import ListItem from './ListItem';

export interface IListRoom {
  title: string;
  fetchData: () => Promise<void>;
  isMyAccount?: boolean;
}
const ListRoom: React.FC<IListRoom> = (props) => {
  const { title, fetchData, isMyAccount } = props;
  return (
    <div className="px-[48px]">
      <Flex className=" items-center justify-between py-[24px]">
        <div className=" font-[600] text-[20px] w-fit">{title}</div>
      </Flex>
      <ListItem isMyAccount={isMyAccount} fetchData={fetchData} />
    </div>
  );
};

export default ListRoom;
