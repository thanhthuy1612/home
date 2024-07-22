'use client';

import React from 'react';
import {
  FacebookOutlined,
  HomeOutlined,
  LinkOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import handlePosts from '@/app/api/HandPosts';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { IContactData, updateContact } from '@/lib/features/contact';
import { Flex } from 'antd';

const FooterLayout: React.FC = () => {
  const { data } = useAppSelector((state) => state.contact);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await handlePosts.getContact();
      const initData: IContactData[] = [
        {
          title: 'Email',
          Icon: MailOutlined,
          content: res?.data?.email,
          onClick: () => {
            window.location.href = `mailto:${res?.data?.email}`;
          },
        },
        {
          title: 'Phone',
          Icon: PhoneOutlined,
          content: res?.data?.phone,
        },
        {
          title: 'Facebook',
          Icon: FacebookOutlined,
          content: res?.data?.facebook,
          onClick: () => {
            if (res?.data?.facebook) {
              window.location.href = res?.data?.facebook;
            }
          },
        },
        {
          title: 'Zalo',
          Icon: LinkOutlined,
          content: res?.data?.zalo,
        },
      ];
      dispatch(updateContact(initData));
    };
    fetchData();
  }, []);

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
        <div className=" underline text-[16px] mb-[8px]">
          Thông tin liên lạc:
        </div>
        {data.map((item: IContactData) => (
          <Flex key={item.title} gap={5}>
            <Flex gap={10}>
              <item.Icon /> <span>{item.title}:</span>
            </Flex>
            <div
              className={` ml-10px ${item?.onClick && 'cursor-pointer hover:text-colorSelect'}`}
              onClick={item?.onClick}
            >
              {item.content}
            </div>
          </Flex>
        ))}
      </div>
    </div>
  );
};

export default FooterLayout;
