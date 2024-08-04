'use client';

import { useAppSelector } from '@/lib/hooks';
import { Button, Descriptions, DescriptionsProps } from 'antd';
import { IPost } from '@/interface/IPost';
import React from 'react';
import CreateBook from '@/components/formBook/CreateBook';
export interface IPriceProduct {
  price?: number;
  priceTag: any;
  className: string;
  item?: IPost;
}
const PriceProduct: React.FC<IPriceProduct> = (props) => {
  const [openBook, setOpenBook] = React.useState(false);
  const { priceTag, price, className, item } = props;
  const { role } = useAppSelector((state) => state.user);

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
      <div className=" font-[600] text-colorError text-[24px] mb-[8px]">
        {`${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / tháng
      </div>
      {!role && (
        <Button
          type="primary"
          className="hover:!bg-colorSelect my-[16px]"
          size="large"
          onClick={() => setOpenBook(true)}
        >
          Đặt lịch xem phòng
        </Button>
      )}
      {openBook && (
        <CreateBook
          title={item?.title}
          isOpen={openBook}
          onDismiss={() => setOpenBook(false)}
          id={item?.id}
        />
      )}
    </div>
  );
};

export default PriceProduct;
