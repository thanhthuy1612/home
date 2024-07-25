'use client';

import React from 'react';

export interface IFormLayout {
  children: React.ReactNode;
}

const FormLayout: React.FC<IFormLayout> = ({ children }) => {
  return (
    <div className=" bg-bgColor px-[16px] py-[48px] flex justify-center items-center">
      {children}
    </div>
  );
};

export default FormLayout;
