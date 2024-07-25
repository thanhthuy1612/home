'use client';

import { Descriptions, DescriptionsProps } from 'antd';
import React from 'react';
export interface IPriceProduct {
  price?: number;
  priceTag: any;
  className: string;
}
const PriceProduct: React.FC<IPriceProduct> = (props) => {
  const { priceTag, price, className } = props;
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Giá điện',
      children: `${priceTag['Dien'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / kW`,
    },
    {
      key: '2',
      label: 'Giá nước',
      children: `${priceTag['Nuoc'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ/ khối`,
    },
    {
      key: '3',
      label: 'Dịch vụ vệ sinh',
      children: `${priceTag['DichVuVeSinh'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / phòng`,
    },
    {
      key: '4',
      label: 'Gửi xe máy',
      children: `${priceTag['GiuXeMay'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / xe`,
    },
    {
      key: '5',
      label: 'Gửi ô tô',
      children: `${priceTag['GiuOto'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / xe`,
    },
    {
      key: '6',
      label: 'Máy giặt',
      children: `${priceTag['MayGiat'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / người`,
    },
    {
      key: '7',
      label: 'Rác thải',
      children: `${priceTag['RacThai'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / người`,
    },
    {
      key: '8',
      label: 'Wifi',
      children: `${priceTag['Wifi'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / người`,
    },
  ];
  return (
    <div className={className}>
      <div className=" font-[600] mb-[8px] border-b-[1px] w-fit border-colorSelect">
        GIÁ DỊCH VỤ
      </div>
      <Descriptions items={items} column={{ xs: 1, sm: 1, md: 2 }} />
      <div className=" font-[600] mb-[8px] mt-[24px] border-b-[1px] w-fit border-colorSelect">
        GIÁ THUÊ PHÒNG
      </div>
      <div className=" font-[600] text-colorError text-[24px]">
        {`${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / tháng
      </div>
    </div>
  );
};

export default PriceProduct;
