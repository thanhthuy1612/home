'use client';

import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useNotification } from '@/utils/useNotification';
import { useRouter } from 'next/navigation';
import handleUsers from '@/app/api/HandUsers';
import { updateIsLoadingForm } from '@/lib/features/login';
import { updateUser } from '@/lib/features/user';

type FieldType = {
  username?: string;
  password?: string;
};

const FormLogin: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);

  const { isLoadingConnect, isLoadingForm } = useAppSelector(
    (state) => state.login,
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { setNotification } = useNotification();

  React.useEffect(() => {
    setIsDisable(isLoadingConnect || isLoadingForm);
  }, [isLoadingConnect, isLoadingForm]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (values.username && values.password) {
      dispatch(updateIsLoadingForm(true));
      const fetchLogin = await handleUsers.signIn({
        username: values.username,
        password: values.password,
      });
      const onSuccess = () => {
        dispatch(updateUser(fetchLogin?.data));
        localStorage.setItem('token', fetchLogin.data.accessToken);
        router.push('/');
      };
      setNotification(
        fetchLogin,
        'Đăng nhập thành công',
        onSuccess,
        'Nhập sai tài khoản hoặc mật khẩu',
      );
      dispatch(updateIsLoadingForm(false));
    }
  };
  return (
    <Form
      name="login"
      style={{ width: '100%' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item<FieldType>
        name="username"
        tooltip="Yêu cầu nhập ký tự trong khoảng 8-32"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { min: 8, message: 'Tài khoản phải có ít nhất 8 ký tự' },
          { max: 32, message: 'Vui lòng nhập ít hơn 32 ký tự' },
        ]}
      >
        <Input
          disabled={isDisable}
          placeholder="Tài khoản"
          style={{ borderRadius: '50px', width: '100%' }}
          size="large"
          prefix={
            <UserOutlined style={{ marginLeft: '5px', marginRight: '5px' }} />
          }
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        tooltip="Yêu cầu nhập ký tự trong khoảng 8-32"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
          { max: 32, message: 'Vui lòng nhập ít hơn 32 ký tự' },
        ]}
      >
        <Input.Password
          disabled={isDisable}
          placeholder="Mật khẩu"
          style={{ borderRadius: '50px', width: '100%' }}
          size="large"
          prefix={
            <KeyOutlined style={{ marginLeft: '5px', marginRight: '5px' }} />
          }
        />
      </Form.Item>

      <Form.Item
        style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <Button
          type="primary"
          className="hover:!bg-colorSelect"
          style={{
            borderRadius: '50px',
            width: '100%',
            paddingLeft: '60px',
            paddingRight: '60px',
          }}
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
