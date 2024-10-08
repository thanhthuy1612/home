'use client';

import React from 'react';
import { Button, Form, Input, type FormProps } from 'antd';
import HeaderSettings from '../components/HeaderSettings';
import { UserFieldType } from '@/enum/UserFieldType';
import handleUsers from '@/app/api/HandUsers';
import { useNotification } from '@/utils/useNotification';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateUser } from '@/lib/features/user';

const ProfileForm: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);

  const [form] = Form.useForm();
  const router = useRouter();
  const { setNotification } = useNotification();
  const dispatch = useAppDispatch();

  const { fullname, email, phone, zalo, facebook } = useAppSelector(
    (state) => state.user,
  );
  const { isLoadingConnect } = useAppSelector((state) => state.login);

  React.useEffect(() => {
    setIsDisable(isLoadingConnect);
  }, [isLoadingConnect]);

  const onFinish: FormProps<UserFieldType>['onFinish'] = async (values) => {
    setIsDisable(true);
    const res = await handleUsers.changeInfo({
      fullname: values?.fullname,
      email: values?.email,
      phone: values?.phone,
      zalo: values?.zalo,
      facebook: values?.facebook,
    });
    const onSuccess = () => {
      dispatch(updateUser(res?.data));
      router.push('/');
    };
    setNotification(res, 'Cập nhật thông tin', onSuccess);

    setIsDisable(false);
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
      initialValues={{
        fullname: fullname,
        email: email,
        phone: phone,
        zalo: zalo,
        facebook: facebook,
      }}
    >
      <HeaderSettings title="Cập nhật thông tin" />
      <Form.Item<UserFieldType>
        name="fullname"
        label="Họ và Tên"
        tooltip="Yêu cầu nhập ký tự ít hơn 64"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 64, message: 'Vui lòng nhập ít hơn 64 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Họ và tên" size="large" />
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
        tooltip="Yêu cầu nhập ký tự ít hơn 15"
        name="phone"
        label="Số điện thoại"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 15, message: 'Vui lòng nhập ít hơn 15 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Số điện thoại" size="large" />
      </Form.Item>

      <Form.Item<UserFieldType>
        tooltip="Yêu cầu nhập ký tự ít hơn 256"
        name="facebook"
        label="Link facebook"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 256, message: 'Vui lòng nhập ít hơn 256 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Link facebook" size="large" />
      </Form.Item>

      <Form.Item<UserFieldType>
        tooltip="Yêu cầu nhập ký tự ít hơn 64"
        name="zalo"
        label="Zalo"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 64, message: 'Vui lòng nhập ít hơn 64 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Zalo" size="large" />
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
