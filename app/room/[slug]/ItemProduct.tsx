'use client';

import { Descriptions, DescriptionsProps, Flex } from 'antd';
import React from 'react';

export interface List {
  title: string;
  contents: string[];
}
export interface IItemProduct {
  list: List[];
  className: string;
}
const ItemProduct: React.FC<IItemProduct> = ({ list, className }) => {
  const items: DescriptionsProps['items'] =
    list.reduce((result: DescriptionsProps['items'], item) => {
      if (item?.contents.length) {
        (result ?? []).push({
          key: item.title,
          label: item.title,
          children: (
            <Flex wrap gap={8}>
              {item.contents.map((content, index) => (
                <div key={content}>
                  {content}
                  {index !== item.contents.length - 1 && ','}
                </div>
              ))}
            </Flex>
          ),
        });
      }
      return result;
    }, []) ?? [];
  return (
    <div className={className}>
      <div className=" font-[600] mb-[8px] border-b-[1px] w-fit border-colorSelect">
        TIỆN ÍCH/TIỆN NGHI
      </div>
      <Descriptions
        items={items}
        column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
      />
    </div>
  );
};

export default ItemProduct;
