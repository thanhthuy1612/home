'use client';

import { useAppSelector } from '@/lib/hooks';
import { Descriptions, DescriptionsProps, Flex } from 'antd';
import React from 'react';

export interface IContact {
  className: string;
}
const Contact: React.FC<IContact> = ({ className }) => {
  const { data } = useAppSelector((state) => state.contact);
  const [items, setItems] = React.useState<DescriptionsProps['items']>([]);
  React.useEffect(() => {
    const initItems: DescriptionsProps['items'] = data.map((item) => {
      return {
        label: item.title,
        children: (
          <div
            className={` ml-10px ${item?.onClick && 'cursor-pointer hover:text-colorSelect'}`}
            onClick={item?.onClick}
          >
            {item.content}
          </div>
        ),
        key: item.title,
      };
    });
    setItems(initItems);
  }, [data]);

  return (
    <div className={className}>
      <div className=" font-[600] mb-[8px] border-b-[1px] w-fit border-colorSelect">
        LIÊN HỆ ĐỂ ĐƯỢC HỖ TRỢ TRỰC TIẾP
      </div>
      <Descriptions
        items={items}
        column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
      />
    </div>
  );
};

export default Contact;
