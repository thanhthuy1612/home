import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

const ErrorAuthorized: React.FC = () => {
  const router = useRouter();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không được phép truy cập trang này."
      extra={
        <Button
          type="primary"
          className="hover:!bg-colorSelect"
          onClick={() => router.push('/')}
        >
          Về trang chủ
        </Button>
      }
    />
  );
};

export default ErrorAuthorized;
