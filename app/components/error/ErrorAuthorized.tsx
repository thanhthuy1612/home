import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ErrorAuthorized: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không được phép truy cập trang này."
      extra={
        <Button type="primary" className='hover:!bg-colorSelect' onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorAuthorized;
