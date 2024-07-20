'use client';

import { iconFooter, infoFooter } from '@/default/contactFooter';
import { Descriptions, DescriptionsProps, Flex } from 'antd';
import React from 'react';

const Contact: React.FC = () => {
  const [item, setItem] = React.useState<DescriptionsProps['items']>([]);

  React.useEffect(() => {
    const listInfo = infoFooter.map((item, index) => {
      return {
        key: index.toString(),
        label: item.title,
        children: item.content,
      };
    });
    const info = {
      key: '100',
      label: 'Nền tảng cộng đồng',
      children: (
        <Flex gap={20}>
          {iconFooter.map((item) => (
            <div
              key={item.title}
              className=" flex cursor-pointer hover:text-colorSelect"
              onClick={() => {
                window.location.href = item.href;
              }}
            >
              <item.Icon className=" mr-[10px]" />
              {item.title}
            </div>
          ))}
        </Flex>
      ),
    };
    setItem([...listInfo, info]);
  }, []);
  return (
    <>
      <div>
        <div className=" font-[600] mb-[8px] mt-[24px] border-b-[1px] w-fit border-colorSelect">
          LIÊN HỆ ĐỂ ĐƯỢC HỖ TRỢ TRỰC TIẾP
        </div>
        <Descriptions items={item} column={{ xs: 1, sm: 1, md: 2 }} />
      </div>
    </>
  );
};

export default Contact;
