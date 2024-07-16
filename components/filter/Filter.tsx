'use client'

import { updateCost, updateLocation, updateSearchValue, updateType } from '@/lib/features/listRoom';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Select } from 'antd';
import React from 'react';

const Filter: React.FC = () => {
  const { width } = useAppSelector((state) => state.login);
  const {
    cost,
    location,
    type,
    listCost,
    listLocation,
    isLoadingListFilter,
    listType,
  } = useAppSelector((state) => state.listRoom);
  const dispatch = useAppDispatch();

  const handleChangeCost = (value: string) => {
    dispatch(updateCost(value));
  };

  const handleChangeLocation = (value: string) => {
    dispatch(updateLocation(value));
  };

  const handleChangeType = (value: string) => {
    dispatch(updateType(value));
  };

  const handleChangeSearchValue: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    dispatch(updateSearchValue(e.target.value));
  };

  const onClickSearch = () => {};

  return (
    <Flex
      gap={10}
      wrap
      className=" px-[48px] py-[16px] border-borderHeader border-b-[1px] justify-between items-center"
    >
      <Input
        style={{ width: width < 800 ? '100%' : 'calc((100% - 240px) / 4' }}
        onChange={handleChangeSearchValue}
        prefix={<SearchOutlined />}
        placeholder="Tìm kiếm phòng trọ..."
      />
      <Select
        style={{ width: width < 800 ? '100%' : 'calc((100% - 240px) / 4' }}
        placeholder="Mức giá"
        onChange={handleChangeCost}
        value={cost}
        options={listCost}
        loading={isLoadingListFilter}
      />
      <Select
        style={{ width: width < 800 ? '100%' : 'calc((100% - 240px) / 4' }}
        onChange={handleChangeLocation}
        placeholder="Vị trí"
        value={location}
        options={listLocation}
        loading={isLoadingListFilter}
      />
      <Select
        style={{ width: width < 800 ? '100%' : 'calc((100% - 240px) / 4' }}
        onChange={handleChangeType}
        placeholder="Phân loại"
        value={type}
        options={listType}
        loading={isLoadingListFilter}
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

export default Filter;
