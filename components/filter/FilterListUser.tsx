'use client';

import { updateSearchValue } from '@/lib/features/listUser';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Input } from 'antd';
import React from 'react';

export interface IFilter {
  fetchData: (isFirst?: boolean) => Promise<void>;
}

const FilterListUser: React.FC<IFilter> = ({ fetchData }) => {
  const { width } = useAppSelector((state) => state.login);
  const { searchValue } = useAppSelector((state) => state.listUser);
  const dispatch = useAppDispatch();

  const handleChangeSearchValue: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    dispatch(updateSearchValue(e.target.value));
  };

  const onClickSearch = () => {
    fetchData(true);
  };

  return (
    <Flex
      gap={10}
      wrap
      className=" px-[24px] py-[16px] border-borderHeader border-b-[1px] items-center"
    >
      <Input
        style={{ width: width < 1600 ? '100%' : 'calc((100% - 200px) / 3' }}
        onChange={handleChangeSearchValue}
        prefix={<SearchOutlined />}
        placeholder="Tìm kiếm người dùng"
        value={searchValue}
        onPressEnter={onClickSearch}
      />
    </Flex>
  );
};

export default FilterListUser;
