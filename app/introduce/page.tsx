import { introduce } from '@/default/introduce';
import { CheckOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import React from 'react';
import HeaderSettings from '../settings/components/HeaderSettings';

const Introduce: React.FC = () => {
  return (
    <div className="mx-[16px] mb-[24px] py-[24px]">
      <HeaderSettings title="Giới thiệu về chúng tôi" />
      {introduce.map((item) => (
        <div key={item.title}>
          <div className=" font-[600] mb-[8px] mt-[24px] border-b-[1px] w-fit border-colorSelect">
            {item.title}
          </div>
          <Flex className=" flex-col" gap={20}>
            {item.contents.map((content) => (
              <Flex key={content} gap={5} align="center">
                <CheckOutlined className=" text-[10px] text-bgColor rounded-[50%] p-[2px] bg-colorSelect" />
                {content}
              </Flex>
            ))}
          </Flex>
        </div>
      ))}
    </div>
  );
};

export default Introduce;
