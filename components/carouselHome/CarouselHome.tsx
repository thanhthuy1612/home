import { Carousel } from 'antd';
import React from 'react';
import Image from 'next/image';
import { carouseImage } from '@/default/carouseImage';
import { useAppSelector } from '@/lib/hooks';

const CarouselHome: React.FC = () => {
  const { width } = useAppSelector((state) => state.login);
  return (
    <Carousel autoplay arrows>
      {carouseImage.map((item) => (
        <div
          key={item.id}
          style={{
            height: `${width / 4}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className=" relative"
        >
          <Image
            height={width / 4}
            src={item.src}
            alt={item.id.toString()}
            className="  w-[100%] object-cover"
            style={{
              height: `${width / 4}px`,
            }}
          />
          <div
            style={{ height: `${width / 4}px`, width: '100%' }}
            className=" absolute top-0 flex flex-col items-center justify-center bg-[rgba(0,0,0,0.5)]"
          >
            <div className="text-justify text-bgColor text-[30px] font-[600]">
              TROSINHVIEN.VN
            </div>
            <div className="text-justify text-bgColor text-[20px]">
              Chuyên kênh thông tin phòng trọ cho thuê.
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselHome;
