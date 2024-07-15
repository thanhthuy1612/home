'use client';

import { Flex } from 'antd';
import React from 'react';

export interface ILabel {
  title: string;
  className?: string;
  icon?: JSX.Element;
}

const Label: React.FC<ILabel> = (props) => {
  const { title, className, icon } = props;
  return (
    <Flex className={` font-[600] ${className} gap-[10px]`}>
      {icon}
      {title}
    </Flex>
  );
};

export default Label;
