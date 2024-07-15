import { CheckOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import React from 'react';

const Introduce: React.FC = () => {
  const list = [
    {
      title: 'Đối Với Người Thuê',
      contents: ['Cung cấp giải pháp tìm kiếm phòng trọ, căn hộ dịch vụ thuận lợi và uy tín'],
    },
    {
      title: 'Đối Với Chủ Cho Thuê',
      contents: [
        'Cung cấp nền tảng quản lý kinh doanh và vận hành hiệu quả',
        'Cung cấp gói marketing và giải pháp bán hàng. ( Phù hợp với các chủ hệ thống )',
        'Tư vấn đầu tư xây dựng nhà trọ, căn hộ dịch vụ',
      ],
    },
    {
      title: ' Đối Với Môi Giới và Đối Tác',
      contents: [
        'Đào tạo khởi nghiệp mô hình kinh doanh cho thuê nhà trọ, căn hộ dịch vụ',
        'Cung cấp các phương thức hợp tác toàn thời gian, bán thời gian và cộng tác viên trực tuyến',
        'Cung cấp nền tảng, quy trình quản lý, vận hành đội nhóm cho các team sale',
      ],
    },
  ];
  return (
    <div className="mx-[48px]">
      <Flex justify="center">
        <div className=" my-[24px] font-[600] text-[25px] border-[2px] w-fit border-colorSelect rounded-[15px] px-[10px] py-[5px]">
          Giới thiệu
        </div>
      </Flex>
      {list.map((item) => (
        <div key={item.title}>
          <div className=" font-[600] mb-[8px] mt-[24px] border-b-[1px] w-fit border-colorSelect">{item.title}</div>
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
