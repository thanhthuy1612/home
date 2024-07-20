'use client';

import { Descriptions, DescriptionsProps } from 'antd';
import React from 'react';
import HeaderSettings from '../settings/components/HeaderSettings';
import { iconFooter, infoFooter } from '@/default/contactFooter';

const Contact: React.FC = () => {
  const items: DescriptionsProps['items'] = infoFooter.map((item) => {
    return {
      label: item.title,
      children: item.content,
      key: item.title,
    };
  });
  const itemsCD: DescriptionsProps['items'] = iconFooter.map((item) => {
    return {
      label: item.title,
      children: (
        <div
          className=" cursor-pointer hover:text-colorSelect"
          onClick={() => {
            window.location.href = item.href;
          }}
        >
          {item.href}
        </div>
      ),
      key: item.title,
    };
  });
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
      <Descriptions
        title={
          <div className=" font-[600] mb-[8px] mt-[24px] border-b-[1px] w-fit border-colorSelect">
            Nền tảng cộng đồng:
          </div>
        }
        column={1}
        items={itemsCD}
      />
    </div>
  );
};

export default Contact;
