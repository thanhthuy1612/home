'use client';

import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import {
  FacebookOutlined,
  KeyOutlined,
  LinkOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { UserFieldType } from '@/enum/UserFieldType';
import { useAppSelector } from '@/lib/hooks';

const FormRegister: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(true);
  const { isLoadingConnect, isLoadingForm } = useAppSelector(
    (state) => state.login,
  );
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  // const { setNotification } = useNotification();

  React.useEffect(() => {
    setIsDisable(isLoadingConnect || isLoadingForm);
  }, [isLoadingConnect, isLoadingForm]);

  const onFinish: FormProps<UserFieldType>['onFinish'] = async (values) => {
    console.log(values);
  };

  return (
    <Form
      scrollToFirstError
      name="register"
      style={{ width: '100%' }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<UserFieldType>
        name="username"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          disabled={isDisable}
          placeholder="Họ và tên"
          style={{ borderRadius: '50px' }}
          size="large"
          prefix={
            <UserOutlined style={{ marginLeft: '5px', marginRight: '5px' }} />
          }
        />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          { required: true, message: 'Vui lòng nhập thông tin!' },
        ]}
      >
        <Input
          disabled={isDisable}
          placeholder="Email"
          style={{ borderRadius: '50px' }}
          size="large"
          prefix={
            <MailOutlined style={{ marginLeft: '5px', marginRight: '5px' }} />
          }
        />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="phone"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          disabled={isDisable}
          placeholder="Số điện thoại"
          style={{ borderRadius: '50px' }}
          size="large"
          prefix={
            <PhoneOutlined style={{ marginLeft: '5px', marginRight: '5px' }} />
          }
        />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="facebook"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          disabled={isDisable}
          placeholder="Link facebook"
          style={{ borderRadius: '50px' }}
          size="large"
          prefix={
            <FacebookOutlined
              style={{ marginLeft: '5px', marginRight: '5px' }}
            />
          }
        />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="zalo"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          disabled={isDisable}
          placeholder="Link zalo"
          style={{ borderRadius: '50px' }}
          size="large"
          prefix={
            <LinkOutlined style={{ marginLeft: '5px', marginRight: '5px' }} />
          }
        />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="password"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          () => ({
            validator(_, value) {
              if (!value || value.length >= 8) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu lớn hơn 8 ký tự'));
            },
          }),
        ]}
      >
        <Input.Password
          disabled={isDisable}
          placeholder="Mật khẩu"
          style={{ borderRadius: '50px' }}
          size="large"
          prefix={
            <KeyOutlined style={{ marginLeft: '5px', marginRight: '5px' }} />
          }
        />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="rePassword"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập thông tin!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Mật khẩu mới bạn nhập không khớp!'),
              );
            },
          }),
        ]}
      >
        <Input.Password
          disabled={isDisable}
          placeholder="Nhập lại mật khẩu"
          style={{ borderRadius: '50px' }}
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
          size="large"
          style={{
            borderRadius: '50px',
            paddingLeft: '50px',
            paddingRight: '50px',
          }}
          htmlType="submit"
        >
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormRegister;
