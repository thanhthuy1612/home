import React from 'react';
import { Flex, Layout } from 'antd';
import MenuHeader from './Menu';
import LoginButton from './LoginButton';

const { Header } = Layout;

const HeaderLayout: React.FC = () => {
  return (
    <Header className=" border-b-[1px] border-borderHeader border-solid bg-bgColor">
      <Flex className=" items-center justify-between gap-[30px]">
        <MenuHeader />
        <LoginButton />
      </Flex>
    </Header>
  );
};

export default HeaderLayout;
