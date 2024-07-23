import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

const ErrorExist: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-[100%]">
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
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
    </div>
  );
};

export default ErrorExist;
