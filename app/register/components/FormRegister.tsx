'use client';

import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { UserFieldType } from '@/enum/UserFieldType';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { updateIsLoadingForm } from '@/lib/features/login';
import { updateUser } from '@/lib/features/user';
import handleUsers from '@/app/api/HandUsers';
import { useNotification } from '@/utils/useNotification';
import HeaderSettings from '@/app/settings/components/HeaderSettings';

const FormRegister: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(true);
  const { isLoadingConnect, isLoadingForm } = useAppSelector(
    (state) => state.login,
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { setNotification } = useNotification();

  React.useEffect(() => {
    setIsDisable(isLoadingConnect || isLoadingForm);
  }, [isLoadingConnect, isLoadingForm]);

  const onFinish: FormProps<UserFieldType>['onFinish'] = async (values) => {
    dispatch(updateIsLoadingForm(true));
    const fetchRegister = await handleUsers.register({
      username: values.username,
      password: values.password,
      fullname: values.fullname,
      email: values.email,
      phone: values.phone,
      facebook: values.facebook,
      zalo: values.zalo,
    });
    const onSuccess = () => {
      router.push('/');
    };
    setNotification(
      fetchRegister,
      'Đăng ký thành công',
      onSuccess,
      'Tài khoản bị trùng',
    );
    dispatch(updateIsLoadingForm(false));
  };

  return (
    <Form
      scrollToFirstError
      onFinish={onFinish}
      style={{ paddingBlock: 32 }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      className=" mx-[16px]"
    >
      <HeaderSettings title="Thêm tài khoản cộng tác viên" />
      <Form.Item<UserFieldType>
        name="fullname"
        label="Họ và tên"
        tooltip="Yêu cầu nhập ký tự ít hơn 64"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 64, message: 'Vui lòng nhập ít hơn 64 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Họ và tên" size="large" />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="username"
        label="Tài khoản"
        tooltip="Yêu cầu nhập ký tự trong khoảng 8-32"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
          { max: 32, message: 'Vui lòng nhập ít hơn 32 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Tài khoản" size="large" />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="email"
        label="Email"
        tooltip="Yêu cầu nhập ký tự ít hơn 128"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 128, message: 'Vui lòng nhập ít hơn 128 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Email" size="large" />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="phone"
        tooltip="Yêu cầu nhập ký tự ít hơn 15"
        label="Số điện thoại"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 15, message: 'Vui lòng nhập ít hơn 15 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Số điện thoại" size="large" />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="facebook"
        label="Link facebook"
        tooltip="Yêu cầu nhập ký tự ít hơn 256"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 256, message: 'Vui lòng nhập ít hơn 256 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Link facebook" size="large" />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="zalo"
        label="Link zalo"
        tooltip="Yêu cầu nhập ký tự ít hơn 64"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 64, message: 'Vui lòng nhập ít hơn 64 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Link zalo" size="large" />
      </Form.Item>

      <Form.Item<UserFieldType>
        name="password"
        label="Mật khẩu"
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
          size="large"
        />
      </Form.Item>

      <Form.Item<UserFieldType>
        label="Nhập lại mật khẩu"
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
          size="large"
        />
      </Form.Item>

      <Form.Item
        style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <Button
          type="primary"
          className="hover:!bg-colorSelect"
          size="large"
          htmlType="submit"
        >
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormRegister;
