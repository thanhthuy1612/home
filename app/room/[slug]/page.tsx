'use client';

import { Descriptions, Flex, Image, DescriptionsProps } from 'antd';
import React from 'react';
import ItemProduct, { List } from './ItemProduct';
import PriceProduct from './PriceProduct';
import { useAppSelector } from '@/lib/hooks';

const Product = ({ params }: { params: { slug: string } }) => {
  const { width } = useAppSelector((state) => state.login);

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Mô tả',
      children: '1111111111111111111111111111111111111111111111111111111111',
    },
    {
      key: '2',
      label: 'Địa chỉ',
      children: '12345',
    },
    {
      key: '3',
      label: 'Số người',
      children: 2,
    },
  ];

  const listIntroduce: List[] = [
    {
      title: 'TIỆN ÍCH PHÒNG',
      contents: ['Cửa sổ giếng trời', 'WC riêng', 'Wifi'],
    },
    {
      title: 'TIỆN NGHI PHÒNG',
      contents: ['Bàn ăn', 'Giường', 'Máy lạnh', 'Nệm', 'Tủ đồ', 'Tủ lạnh'],
    },
    {
      title: 'TIỆN NGHI TRONG NHÀ',
      contents: [
        'Camera',
        'Để xe trong nhà',
        'Khóa vân tay',
        'Máy giặt chung',
        'Thang bộ',
      ],
    },
    {
      title: 'TIỆN ÍCH XUNG QUANH',
      contents: [
        'Chợ',
        'Hàng quán ăn',
        'Siêu Thị tiện lợi',
        'Trung Tâm Thương Mại',
      ],
    },
  ];
  return (
    <Flex className=" flex-col items-center py-[24px] px-[48px]">
      <Flex justify="center">
        <div className=" mb-[24px] font-[600] text-[25px] border-b-[2px] border-colorSelect">
          Phòng 123 {params.slug}
        </div>
      </Flex>
      <Flex
        gap={20}
        wrap
        style={{ flexDirection: width < 500 ? 'column' : 'row' }}
      >
        <Image
          height={width < 800 ? 300 : 500}
          width={width < 800 ? 300 : 500}
          src={'https://randomuser.me/api/portraits/men/18.jpg'}
        />
        <Flex
          className=" flex-col justify-between"
          style={{ width: width < 800 ? '100%' : 'calc(100% - 520px)' }}
        >
          <Descriptions items={items} column={{ xs: 1, sm: 1, md: 2 }} />
          <ItemProduct list={listIntroduce} />
          <PriceProduct
            cost={4000000}
            electric=" 4k / kwh"
            water="150k"
            control="150k"
            bike="150k"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
