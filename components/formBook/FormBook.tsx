'use client';

import { Button, DatePicker, Form, FormProps, GetProps, Input } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import handlePosts from '@/app/api/HandPosts';
import { IBookRoom } from '@/app/api/interfaces/IBookRoom';
import { useNotification } from '@/utils/useNotification';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

export interface IFormBookProps {
  id?: string;
  onDismiss: () => void;
}

const FormBook: React.FC<IFormBookProps> = ({ id, onDismiss }) => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  const { setNotification } = useNotification();
  const onFinish: FormProps['onFinish'] = async (values) => {
    setIsDisable(true);
    const res = await handlePosts.postBook(id ?? '', values);
    setNotification(res, 'Đặt lịch thành công', onDismiss, "Đặt lịch thất bại");

    setIsDisable(false);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  return (
    <Form
      form={form}
      scrollToFirstError
      onFinish={onFinish}
      style={{ paddingBlock: 32 }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      className=" mx-[16px]"
    >
      <Form.Item
        name="fullname"
        label="Họ và tên"
        tooltip="Yêu cầu nhập ký tự ít hơn 64"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 64, message: 'Vui lòng nhập ít hơn 64 ký tự' },
        ]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Họ và tên"
          size="large"
        />
      </Form.Item>
      <Form.Item
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
      <Form.Item
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
      <Form.Item
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

      <Form.Item
        tooltip="Yêu cầu nhập ký tự ít hơn 64"
        name="zalo"
        label="Link zalo"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 64, message: 'Vui lòng nhập ít hơn 64 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Link zalo" size="large" />
      </Form.Item>
      <Form.Item
        name="bookingDate"
        label="Ngày/giờ hẹn xem phòng"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <DatePicker
          format="DD-MM-YYYY HH:mm:ss"
          placeholder="Ngày/giờ hẹn xem phòng"
          disabledDate={disabledDate}
          showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
          className=" w-[100%]"
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
          Đặt lịch xem phòng
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormBook;
