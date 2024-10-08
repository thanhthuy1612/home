import React from 'react';
import dynamic from 'next/dynamic';

const MenuLayout = dynamic(() => import('./MenuLayout'), {
  loading: () => <></>,
  ssr: false,
});

const LoginButton = dynamic(() => import('./LoginButton'), {
  loading: () => <></>,
  ssr: false,
});

const HeaderLayout: React.FC = () => {
  return (
    <div className=" px-[24px] h-[64px] border-b-[1px] border-colorPrimary border-solid bg-bgColor flex items-center justify-between">
      <MenuLayout />
      <LoginButton />
    </div>
  );
};

export default HeaderLayout;
