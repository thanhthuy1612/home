'use client';

import React from 'react';
import {
  FacebookOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import handlePosts from '@/app/api/HandPosts';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { IContactData, updateContact } from '@/lib/features/contact';
import { Flex } from 'antd';
import Link from 'next/link';

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
          title: 'Số diện thoại / Zalo',
          Icon: PhoneOutlined,
          content: res?.data?.phone,
          onClick: async () => {
            await navigator.clipboard.writeText(res?.data?.phone);
          },
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
          title: 'Địa chỉ',
          Icon: HomeOutlined,
          content: res?.data?.address,
        },
      ];
      dispatch(updateContact(initData));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLogo = () => (
    <Link
      className=" hover:text-colorSelect cursor-pointer underline"
      href={'/'}
    >
      TROSINHVIEN.vn
    </Link>
  );

  return (
    <div className=" border-[1px] text-bgColor border-borderHeader bg-colorPrimary flex flex-wrap gap-[30px] justify-between px-[24px] py-[24px]">
      <div className=" min-w-[300px] basis-[100%] md:basis-[45%]">
        <div className=" text-[25px] font-[600] flex items-center mb-[8px]">
          <HomeOutlined className=" text-bgColor mr-[10px]" />
          TROSINHVIEN.VN
        </div>
        <div className="text-justify">
          Chuyên kênh thông tin phòng trọ cho thuê.
        </div>
      </div>
      <div className=" min-w-[300px] basis-[100%] md:basis-[45%]">
        <div className=" underline text-[16px] mb-[8px]">
          Thông tin liên lạc:
        </div>
        {data.map((item: IContactData) => (
          <Flex key={item.title} gap={5} align="start">
            <div className=" flex h-[21px] items-center">
              <item.Icon />
            </div>
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
