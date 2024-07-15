import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ErrorExist: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={
        <Button type="primary" className="hover:!bg-colorSelect" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorExist;
