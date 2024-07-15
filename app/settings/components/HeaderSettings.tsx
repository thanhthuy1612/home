'use client'

import { Flex } from 'antd';
import React from 'react';

export interface IHeaderSettings {
  title: string;
}

const HeaderSettings: React.FC<IHeaderSettings> = ({ title }) => {
  return <Flex className="text-[25px] mb-[24px] justify-center text-colorPrimary">{title}</Flex>;
};

export default HeaderSettings;
