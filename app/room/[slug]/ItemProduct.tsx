'use client'

import { CheckOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import React from 'react';

export interface List {
  title: string;
  contents: string[];
}
export interface IItemProduct {
  list: List[];
}
const ItemProduct: React.FC<IItemProduct> = ({ list }) => {
  return (
    <>
      {list.map((item) => (
        <div key={item.title}>
          <div className=" font-[600] mb-[8px] mt-[24px] border-b-[1px] w-fit border-colorSelect">{item.title}</div>
          <Flex wrap gap={20}>
            {item.contents.map((content) => (
              <Flex key={content} gap={5} justify='center' align='center'>
                <CheckOutlined className=" text-[10px] text-bgColor rounded-[50%] p-[2px] bg-colorSelect" />
                {content}
              </Flex>
            ))}
          </Flex>
        </div>
      ))}
    </>
  );
};

export default ItemProduct;
