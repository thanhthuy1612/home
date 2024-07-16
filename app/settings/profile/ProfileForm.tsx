'use client';

import React from 'react';
import { Button, Form, Input, type FormProps } from 'antd';
import HeaderSettings from '../components/HeaderSettings';
import { UserFieldType } from '@/enum/UserFieldType';

const ProfileForm: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);

  const [form] = Form.useForm();

  const onFinish: FormProps<UserFieldType>['onFinish'] = async (values) => {
    console.log(values);
    setIsDisable(true);
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
      <HeaderSettings title="Cập nhật thông tin" />
      <Form.Item<UserFieldType>
        name="username"
        label="Họ và Tên"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input disabled={isDisable} placeholder="Họ và tên" size="large" />
      </Form.Item>
      <Form.Item<UserFieldType>
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          { required: true, message: 'Vui lòng nhập thông tin!' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Email" size="large" />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="phone"
        label="Số điện thoại"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input disabled={isDisable} placeholder="Số điện thoại" size="large" />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="facebook"
        label="Link facebook"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input disabled={isDisable} placeholder="Link facebook" size="large" />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="zalo"
        label="Link zalo"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input disabled={isDisable} placeholder="Link zalo" size="large" />
      </Form.Item>

      <Form.Item className=" flex justify-center">
        <Button className="hover:bg-colorSelect" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
