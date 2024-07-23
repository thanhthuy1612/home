import { Flex } from 'antd';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <Flex className=" items-center w-fit">
      <div className=" text-colorPrimary text-[25px] font-[600]">
        TROSINHVIEN
      </div>
      <div className=" text-colorSelect text-[25px] font-[600]">.VN</div>
    </Flex>
  );
};

export default Logo;
