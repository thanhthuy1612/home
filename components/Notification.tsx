'use client';

import React from 'react';
import { notification } from 'antd';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetStateNotification } from '@/lib/features/notification';
import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
} from '@ant-design/icons';

const Context = React.createContext({ name: 'Default' });

export default function Notification({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notificationInfo = useAppSelector((state) => state.notification);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();

  const onRenderIcon = () => {
    switch (notificationInfo?.type) {
      case 'success':
        return <CheckCircleFilled className="text-greenPastel" />;
      case 'fail':
        return <ExclamationCircleFilled className="text-redPastel" />;
      case 'warning':
        return <InfoCircleFilled className="text-yellowPastel" />;
    }
  };

  const onRenderMessage = () => {
    switch (notificationInfo?.type) {
      case 'success':
        return 'Thành công';
      case 'fail':
        return 'Lỗi';
      case 'warning':
        return 'Cảnh báo';
    }
  };

  React.useEffect(() => {
    if (notificationInfo?.description) {
      const openNotification = () => {
        api.info({
          message: notificationInfo?.message ?? onRenderMessage(),
          description: notificationInfo?.description,
          placement: notificationInfo?.placement,
          icon: onRenderIcon(),
          style: { borderRadius: '15px' },
        });
        dispatch(resetStateNotification());
      };
      openNotification();
    }
  }, [notificationInfo]);

  const contextValue = React.useMemo(() => ({ name: 'notification' }), []);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      {children}
    </Context.Provider>
  );
}
