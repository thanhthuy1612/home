'use client';

import React from 'react';
import { iconFooter, infoFooter } from '@/default/contactFooter';
import { HomeOutlined } from '@ant-design/icons';

const FooterLayout: React.FC = () => {
  return (
    <div className=" border-[1px] text-bgColor border-borderHeader bg-colorPrimary flex flex-wrap gap-[30px] justify-between px-[48px] py-[24px]">
      <div className=" min-w-[300px]">
        <div className=" text-[25px] font-[600] flex items-center mb-[8px]">
          <HomeOutlined className=" text-bgColor mr-[10px]" />
          HOME.VM
        </div>
        <div>Chuyên kênh thông tin phòng trọ cho thuê.</div>
      </div>
      <div className=" min-w-[300px]">
        <div className=" underline text-[16px] mb-[8px]">Cộng đồng:</div>
        <div>
          {iconFooter.map((item) => (
            <div
              key={item.title}
              className=" flex cursor-pointer hover:text-colorSelect"
            >
              <item.Icon className=" mr-[10px]" />
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div className=" min-w-[300px]">
        <div className=" underline text-[16px] mb-[8px]">
          Thông tin liên lạc:
        </div>
        <div>
          {infoFooter.map((item) => (
            <div key={item.title}>
              {item.title}: {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterLayout;
