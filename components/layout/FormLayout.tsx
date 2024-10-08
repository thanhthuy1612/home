'use client';

import { theme } from 'antd';
import React from 'react';

export interface IFormLayout {
  children: React.ReactNode;
}

const FormLayout: React.FC<IFormLayout> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className=" bg-bgColor p-[24px]">
      <div
        style={{
          margin: 0,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        className=" shadow-2xl border-[1px]"
      >
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
