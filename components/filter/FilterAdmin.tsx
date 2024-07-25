'use client';

import { listArrayPrice, listPrice, listRoomType } from '@/default/list';
import {
  updateCost,
  updateArray,
  updateMaxPeople,
  updateSearchValue,
  updateType,
} from '@/lib/features/listRoom';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Input, InputNumber, Select } from 'antd';
import React from 'react';

export interface IFilter {
  fetchData: (isFirst?: boolean) => Promise<void>;
}

const FilterAdmin: React.FC<IFilter> = ({ fetchData }) => {
  const { width } = useAppSelector((state) => state.login);
  const { cost, array, type, maxPeople, searchValue } = useAppSelector(
    (state) => state.listRoom,
  );
  const dispatch = useAppDispatch();

  const handleChangeCost = (value: string) => {
    dispatch(updateCost(value));
  };

  const handleChangePeopleMax: (value: number | null) => void = (value) => {
    dispatch(updateMaxPeople(value));
  };

  const handleChangeType = (value: string) => {
    dispatch(updateType(value));
  };

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
      className=" px-[48px] py-[16px] border-borderHeader border-b-[1px] justify-between items-center"
    >
      <Input
        style={{ width: width < 1600 ? '100%' : 'calc((100% - 240px) / 4' }}
        onChange={handleChangeSearchValue}
        prefix={<SearchOutlined />}
        placeholder="Địa chỉ"
        value={searchValue}
      />
      <InputNumber
        style={{ width: width < 1600 ? '100%' : 'calc((100% - 240px) / 4' }}
        onChange={handleChangePeopleMax}
        prefix={<UserOutlined />}
        placeholder="Số lượng người tối đa"
        value={maxPeople}
      />
      <Select
        style={{ width: width < 1600 ? '100%' : 'calc((100% - 240px) / 4' }}
        placeholder="Mức giá"
        onChange={handleChangeCost}
        value={cost}
        options={listPrice}
      />
      <Select
        style={{ width: width < 1600 ? '100%' : 'calc((100% - 240px) / 4' }}
        onChange={handleChangeType}
        placeholder="Phân loại"
        value={type}
        options={listRoomType}
      />
      <Button
        onClick={onClickSearch}
        type="primary"
        className=" w-[200px] hover:!bg-colorSelect"
        icon={<SearchOutlined />}
      >
        Tìm kiếm
      </Button>
    </Flex>
  );
};

export default FilterAdmin;
