'use client';

import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
} from 'antd';
import React from 'react';

const CreateHome: React.FC = () => {
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
      className=" mx-[16px]"
    >
      <Flex justify="center">
        <div className=" mb-[24px] font-[600] text-[25px] border-[2px] w-fit border-colorSelect rounded-[15px] px-[10px] py-[5px]">
          Thêm phòng mới
        </div>
      </Flex>
      <Form.Item
        name="name"
        label="Tên phòng"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input disabled={isDisable} placeholder="Tên phòng" size="large" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Giá thuê phòng"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <InputNumber<number>
          disabled={isDisable}
          placeholder="0"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, '') as unknown as number
          }
          addonAfter="VNĐ"
          min={0}
          size="large"
          className=" w-[100%]"
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Mô tả"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Địa chỉ"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="people"
        label="Số người tối đa"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <InputNumber
          className=" w-[100%]"
          defaultValue={1}
          disabled={isDisable}
          placeholder="0"
          addonAfter="Người"
          min={1}
          max={10}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="electric"
        label="Giá điện"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Giá điện"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="water"
        label="Giá nước"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Giá nước"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="control"
        label="Phụ phí quản lý"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          disabled={isDisable}
          placeholder="Phụ phí quản lý"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="bike"
        label="Gửi xe"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Gửi xe"
          size="large"
        />
      </Form.Item>
      <Form.Item name="radio-group" label="Tiện ích phòng">
        <Checkbox.Group>
          <Flex gap={20} wrap>
            <Checkbox value="Cửa sổ giếng trời">Cửa sổ</Checkbox>
            <Checkbox value="WC riêng">WC riêng</Checkbox>
            <Checkbox value="Wifi">Wifi</Checkbox>
            <Checkbox value="Ban công">Ban công</Checkbox>
          </Flex>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item name="radio-group" label="Tiện nghi phòng">
        <Checkbox.Group>
          <Flex gap={20} wrap>
            <Checkbox value="Bàn ăn">Bàn ăn</Checkbox>
            <Checkbox value="Giường">Giường</Checkbox>
            <Checkbox value="Máy lạnh">Máy lạnh</Checkbox>
            <Checkbox value="Nệm">Nệm</Checkbox>
            <Checkbox value="Tủ đồ">Tủ đồ</Checkbox>
            <Checkbox value="Tủ lạnh">Tủ lạnh</Checkbox>
            <Checkbox value="Máy giặt">Máy giặt</Checkbox>
            <Checkbox value="Bình nóng lạnh">Bình nóng lạnh</Checkbox>
          </Flex>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item name="radio-group" label="Tiện nghi trong nhà">
        <Checkbox.Group>
          <Flex gap={20} wrap>
            <Checkbox value="Camera">Camera</Checkbox>
            <Checkbox value="Để xe trong nhà">Để xe trong nhà</Checkbox>
            <Checkbox value="Khóa vân tay">Khóa vân tay</Checkbox>
            <Checkbox value="Máy giặt chung">Máy giặt chung</Checkbox>
            <Checkbox value="Thang bộ">Thang bộ</Checkbox>
            <Checkbox value="Hệ thống phòng cháy">Hệ thống phòng cháy</Checkbox>
            <Checkbox value="Thang máy">Thang máy</Checkbox>
            <Checkbox value="Sân thượng">Sân thượng</Checkbox>
          </Flex>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item name="radio-group" label="Tiện nghi xung quanh">
        <Checkbox.Group>
          <Flex gap={20} wrap>
            <Checkbox value="Chợ">Chợ</Checkbox>
            <Checkbox value="Hàng quán ăn">Hàng quán ăn</Checkbox>
            <Checkbox value="Siêu Thị tiện lợi">Siêu Thị tiện lợi</Checkbox>
            <Checkbox value="'Trung Tâm Thương Mại">
              'Trung Tâm Thương Mại
            </Checkbox>
          </Flex>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item className=" flex justify-center">
        <Button className="hover:bg-colorSelect" htmlType="submit">
          Lưu thông tin
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateHome;
