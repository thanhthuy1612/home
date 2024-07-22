'use client';

import { Descriptions, DescriptionsProps } from 'antd';
import React from 'react';
import HeaderSettings from '../settings/components/HeaderSettings';
import { useAppSelector } from '@/lib/hooks';

const Contact: React.FC = () => {
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
    <div className="mx-[48px] mb-[24px] py-[24px]">
      <HeaderSettings title="Liên hệ" />
      <Descriptions
        title={
          <div className=" font-[600] mb-[8px] mt-[24px] border-b-[1px] w-fit border-colorSelect">
            Thông tin liên lạc:
          </div>
        }
        column={1}
        bordered
        items={items}
      />
    </div>
  );
};

export default Contact;
