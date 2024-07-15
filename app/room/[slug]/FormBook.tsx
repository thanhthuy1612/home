'use client';

import {
  Button,
  DatePicker,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
} from 'antd';
import React from 'react';

const FormBook: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);

  const [form] = Form.useForm();

  const onFinish: FormProps['onFinish'] = async (values) => {
    console.log(values);
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
      className=" mx-[16px] w-[100%]"
    >
      <Flex justify="center">
        <div className=" mb-[24px] font-[600] text-[25px] border-b-[2px] border-colorSelect">
          Đặt lịch xem phòng
        </div>
      </Flex>

      <Form.Item
        name="name"
        label="Họ tên"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Họ tên"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <InputNumber
          addonBefore="+84"
          disabled={isDisable}
          min={0}
          max={999999999}
          placeholder="Số điện thoại"
          size="large"
          className=" w-[100%]"
        />
      </Form.Item>

      <Form.Item
        name="people"
        label="Số người ở"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <InputNumber
          addonAfter="Người"
          defaultValue={1}
          disabled={isDisable}
          placeholder="0"
          min={1}
          max={10}
          size="large"
          className=" w-[100%]"
        />
      </Form.Item>

      <Form.Item
        name="bike"
        label="Số lượng xe"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <InputNumber
          defaultValue={1}
          addonAfter="Xe"
          disabled={isDisable}
          placeholder="0"
          min={1}
          max={10}
          size="large"
          className=" w-[100%]"
        />
      </Form.Item>

      <Form.Item
        label="Ngày dự kiến vào ở"
        name="come"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <DatePicker
          className=" w-[100%]"
          size="large"
          placeholder="Ngày dự kiến vào ở"
        />
      </Form.Item>

      <Form.Item
        label="Thời gian dự kiến xem phòng"
        name="date"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <DatePicker
          className=" w-[100%]"
          size="large"
          placeholder="Thời gian dự kiến xem phòng"
          showTime
        />
      </Form.Item>

      <Form.Item className=" flex justify-center">
        <Button
          type="primary"
          size="large"
          className="hover:!bg-colorSelect my-[24px]"
        >
          Đặt lịch xem phòng
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormBook;
