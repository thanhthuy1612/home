'use client';

import { theme } from 'antd';
import React from 'react';
import Breadcrumb, { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const AuthLayout = dynamic(() => import('@/components/layout/AuthLayout'), {
  loading: () => <></>,
  ssr: false,
});
export interface ISettingLayout {
  children: React.ReactNode;
}

const SettingLayout: React.FC<ISettingLayout> = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = React.useState<ItemType[]>();
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: 'profile',
      label: 'Thông tin cá nhân',
    },
    {
      key: 'password',
      label: 'Mật khẩu',
    },
  ];

  React.useEffect(() => {
    const getBreadcrumb = () => {
      let breadcrumbArray: any[] = items;
      const arrayPath = pathname.split('/settings/');
      const result: ItemType[] = arrayPath[1].split('/').reduce(
        (res: ItemType[], name: string) => {
          const filter = breadcrumbArray.find((item) => item?.key === name);
          if (filter) {
            breadcrumbArray = filter?.children;
            res.push({
              title: filter?.label,
            });
          }
          return res;
        },
        [
          {
            title: 'Cài đặt',
          },
        ],
      );
      setBreadcrumb(result);
    };
    getBreadcrumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <AuthLayout>
      <div className=" bg-bg-color px-[24px] pb-[24px]">
        <Breadcrumb className="py-[16px]" items={breadcrumb}></Breadcrumb>
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
    </AuthLayout>
  );
};

export default SettingLayout;
