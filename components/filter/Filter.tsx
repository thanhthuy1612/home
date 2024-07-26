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
import {
  DownCircleOutlined,
  SearchOutlined,
  UpCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Flex, Input, InputNumber, Select, Tooltip } from 'antd';
import React from 'react';
export interface IFilter {
  fetchData: (isFirst?: boolean) => Promise<void>;
}
const Filter: React.FC<IFilter> = ({ fetchData }) => {
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

  const handleChangeArray = () => {
    dispatch(updateArray(!array));
    fetchData(true);
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
      className=" px-[24px] py-[16px] border-borderHeader border-b-[1px] justify-between items-center"
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
      <Flex className={width < 1600 ? '' : ' w-[200px] justify-end'} gap={10}>
        <Tooltip title={!array ? 'Giá tăng dần' : 'Giá giảm dần'}>
          <Button
            onClick={handleChangeArray}
            type="primary"
            className=" hover:!bg-colorSelect"
          >
            {array ? <DownCircleOutlined /> : <UpCircleOutlined />}
          </Button>
        </Tooltip>
        <Button
          onClick={onClickSearch}
          type="primary"
          className=" hover:!bg-colorSelect"
          icon={<SearchOutlined />}
        >
          Tìm kiếm
        </Button>
      </Flex>
    </Flex>
  );
};

export default Filter;
