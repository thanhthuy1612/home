import { Button, DatePicker, Form, FormProps, GetProps, Input } from 'antd';
import React from 'react';
import dayjs from 'dayjs';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const FormBook: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);
  const onFinish: FormProps['onFinish'] = async (values) => {
    console.log(values);
    setIsDisable(true);
  };

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });
  return (
    <Form
      scrollToFirstError
      name="register"
      style={{ width: '100%' }}
      onFinish={onFinish}
      autoComplete="off"
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
        <Input disabled={isDisable} placeholder="Họ và tên" size="large" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Số điện thoại"
        tooltip="Yêu cầu nhập ký tự ít hơn 15"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 15, message: 'Vui lòng nhập ít hơn 15 ký tự' },
        ]}
      >
        <Input disabled={isDisable} placeholder="Số điện thoại" size="large" />
      </Form.Item>
      <Form.Item
        name="dateIn"
        label="Ngày dự kiến chuyển vào ở"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          placeholder="Ngày dự kiến chuyển vào ở"
          disabledDate={disabledDate}
        />
      </Form.Item>
      <Form.Item
        name="date"
        label="Ngày/giờ hẹn xem phòng"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <DatePicker
          format="DD-MM-YYYY HH:mm:ss"
          placeholder="Ngày/giờ hẹn xem phòng"
          disabledDate={disabledDate}
          disabledTime={disabledDateTime}
          showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
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
