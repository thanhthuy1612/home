import { Flex } from 'antd';
import React from 'react';

const Logo: React.FC = () => {
  return <Flex className=' items-center'>
    <div className=' text-colorPrimary text-[30px] font-[600]'>HOME</div>
    <div className=' text-colorSelect text-[30px] font-[600]'>.VN</div>
  </Flex>;
};

export default Logo;