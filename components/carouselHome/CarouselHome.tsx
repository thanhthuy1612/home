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
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselHome;
