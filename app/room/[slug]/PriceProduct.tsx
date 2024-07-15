'use client'

import { Descriptions, DescriptionsProps } from 'antd';
import React from 'react';
export interface IPriceProduct {
  electric: string;
  water: string;
  control: string;
  bike: string;
  cost: number;
}
const PriceProduct: React.FC<IPriceProduct> = (props) => {
  const { electric, water, control, bike, cost } = props;
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Giá điện',
      children: electric,
    },
    {
      key: '2',
      label: 'Giá nước',
      children: water,
    },
    {
      key: '3',
      label: 'Phụ phí quản lý',
      children: control,
    },
    {
      key: '4',
      label: 'Gửi xe',
      children: bike,
    },
  ];
  return (
    <div>
      <div className=" font-[600] mb-[8px] mt-[24px] border-b-[1px] w-fit border-colorSelect">GIÁ DỊCH VỤ</div>
      <Descriptions items={items} column={{ xs: 1, sm: 1, md: 2 }} />
      <div className=" font-[600] mb-[8px] mt-[24px] border-b-[1px] w-fit border-colorSelect">GIÁ THUÊ PHÒNG</div>
      <div className=' font-[600] text-colorError text-[24px]'>{cost/1000000} triệu / tháng</div>
    </div>
  );
};

export default PriceProduct;
