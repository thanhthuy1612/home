'use client';

import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { KeyOutlined, MailOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/lib/hooks';

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const FormLogin: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);

  const { isLoadingConnect, isLoadingForm } = useAppSelector((state) => state.login);
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  // const { setNotification } = useNotification();

  React.useEffect(() => {
    setIsDisable(isLoadingConnect || isLoadingForm);
  }, [isLoadingConnect, isLoadingForm]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log(values);
  };
  return (
    <Form name="login" style={{ width: '100%' }} initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item<FieldType>
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          { required: true, message: 'Please input your email!' },
        ]}
      >
        <Input
          disabled={isDisable}
          placeholder="Email"
          style={{ borderRadius: '50px' }}
          size="large"
          prefix={<MailOutlined style={{ marginLeft: '5px', marginRight: '5px' }} />}
        />
      </Form.Item>

      <Form.Item<FieldType> name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password
          disabled={isDisable}
          placeholder="Mật khẩu"
          style={{ borderRadius: '50px' }}
          size="large"
          prefix={<KeyOutlined style={{ marginLeft: '5px', marginRight: '5px' }} />}
        />
      </Form.Item>

      <div className="flex justify-end">
        <Button
          disabled={isDisable}
          type="link"
          className="!text-colorPrimary hover:!text-colorHover active:!text-colorPrimary"
        >
          Quên mật khẩu?
        </Button>
      </div>

      <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button
          type="primary"
          className="hover:!bg-colorSelect"
          style={{ borderRadius: '50px', paddingLeft: '60px', paddingRight: '60px' }}
          htmlType="submit"
          size="large"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
