'use client';

import { CheckOutlined } from '@ant-design/icons';
import { Flex, DescriptionsProps, Descriptions } from 'antd';
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
  const items: DescriptionsProps['items'] = list.map((item) => {
    return {
      key: item.title,
      label: item.title,
      children: (
        <Flex wrap gap={16}>
          {item.contents.map((content) => (
            <Flex key={content} gap={5} justify="center" align="center">
              <CheckOutlined className=" text-[10px] text-bgColor rounded-[50%] p-[2px] bg-colorSelect" />
              {content}
            </Flex>
          ))}
        </Flex>
      ),
    };
  });
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
