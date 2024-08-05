'use client';

import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';
import HeaderSettings from '../components/HeaderSettings';
import handleUsers from '@/app/api/HandUsers';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/utils/useNotification';

export type ChangePasswordType = {
  current?: string;
  password?: string;
  rePassword?: string;
};

const PasswordForm: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);

  const [form] = Form.useForm();
  const router = useRouter();
  const { setNotification } = useNotification();

  const onFinish: FormProps<ChangePasswordType>['onFinish'] = async (
    values,
  ) => {
    if (
      values.current &&
      values.password &&
      values.rePassword === values.password
    ) {
      setIsDisable(true);
      const res = await handleUsers.changePassword({
        oldPassword: values.current,
        newPassword: values.password,
      });
      const onSuccess = () => {
        router.push('/');
      };
      setNotification(res, 'Đổi mật khẩu thành công', onSuccess);

      setIsDisable(false);
    }
  };

  return (
    <Form
      form={form}
      scrollToFirstError
      onFinish={onFinish}
      style={{ paddingBlock: 32 }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      className=" mx-[16px]"
    >
      <HeaderSettings title="Cập nhật mật khẩu" />
      <Form.Item<ChangePasswordType>
        tooltip="Yêu cầu nhập ký tự trong khoảng 8-32"
        label="Mật khẩu hiện tại"
        name="current"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
          { max: 32, message: 'Mật khẩu phải có ít hơn 32 ký tự' },
        ]}
      >
        <Input.Password
          disabled={isDisable}
          placeholder="Mật khẩu hiện tại"
          size="large"
        />
      </Form.Item>

      <Form.Item<ChangePasswordType>
        tooltip="Yêu cầu nhập ký tự trong khoảng 8-32"
        label="Mật khẩu mới"
        name="password"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
          { max: 32, message: 'Mật khẩu phải có ít hơn 32 ký tự' },
        ]}
      >
        <Input.Password
          disabled={isDisable}
          placeholder="Mật khẩu mới"
          size="large"
        />
      </Form.Item>

      <Form.Item<ChangePasswordType>
        tooltip="Yêu cầu nhập ký tự trong khoảng 8-32"
        name="rePassword"
        label="Nhập lại mật khẩu"
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
          size="large"
        />
      </Form.Item>

      <Form.Item className=" flex justify-center">
        <Button
          type="primary"
          className="hover:bg-colorSelect"
          htmlType="submit"
        >
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordForm;
