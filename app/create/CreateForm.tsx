'use client';

import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  GetProp,
  Input,
  InputNumber,
  Upload,
  UploadFile,
  UploadProps,
  Image,
  Select,
} from 'antd';
import React from 'react';
import dynamic from 'next/dynamic';
import { listRoomStatus, listRoomType } from '@/default/list';
import { ServiceType } from '@/enum/ServiceType';
import { PriceType } from '@/enum/PriceType';
import { RcFile } from 'antd/es/upload';
import handlePosts from '../api/HandPosts';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/utils/useNotification';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const HeaderSettings = dynamic(
  () => import('../settings/components/HeaderSettings'),
  {
    loading: () => <></>,
    ssr: false,
  },
);

const CreateForm: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [fileImg, setFileImg] = React.useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = React.useState('');
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const [form] = Form.useForm();
  const router = useRouter();
  const { setNotification } = useNotification();

  const onFinish: FormProps['onFinish'] = async (values) => {
    if (fileList.length > 0 && fileImg.length > 0) {
      setIsDisable(true);
      const formData = new FormData();
      const service = {
        [ServiceType.TienIchPhong]: values.tienIchPhong ?? [],
        [ServiceType.TienNghiPhong]: values.tienNghiPhong ?? [],
        [ServiceType.TienIchTrongNha]: values.tienIchTrongNha ?? [],
        [ServiceType.TienIchXungQuanh]: values.tienIchXungQuanh ?? [],
      };

      const price = {
        [PriceType.PriceType]: values.electric,
        [PriceType.Nuoc]: values.water,
        [PriceType.DichVuVeSinh]: values.control,
        [PriceType.RacThai]: values.rash,
        [PriceType.GiuXeMay]: values.bike,
        [PriceType.GiuOto]: values.oto,
        [PriceType.MayGiat]: values.wash,
        [PriceType.Wifi]: values.wifi,
      };

      const fileListImg = fileImg.reduce((res: File[], item) => {
        const file = (item as UploadFile).originFileObj as File;
        return [...res, file];
      }, []);

      formData.append('Title', values.name);
      formData.append('Description', values.description);
      formData.append(
        'PreviewPicture',
        (fileList[0] as UploadFile).originFileObj as File,
      );
      formData.append('Address', values.address);
      formData.append('MaxPeople', values.people);
      formData.append('Price', values.price);
      formData.append('RoomType', values.roomType);
      formData.append('RoomStatus', values.roomStatus);
      formData.append('ServiceTags', JSON.stringify(service));
      formData.append('PriceTags', JSON.stringify(price));
      formData.append('Pictures', JSON.stringify(fileListImg));

      const res = await handlePosts.getCreatePost(formData);
      const onSuccess = () => {
        router.push('/');
      };
      setNotification(res, 'Thêm thành công', onSuccess);
      setIsDisable(false);
    }
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onChangeImg: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileImg(newFileList);
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
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
      <HeaderSettings title="Thêm phòng mới" />
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
          disabled={isDisable}
          placeholder="0"
          addonAfter="Người"
          min={1}
          max={10}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="roomType"
        label="Phân loại"
        rules={[{ required: true, message: 'Vui lòng chọn thông tin!' }]}
      >
        <Select
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Phân loại"
          options={listRoomType}
        />
      </Form.Item>
      <Form.Item
        name="roomStatus"
        label="Trạng thái"
        rules={[{ required: true, message: 'Vui lòng chọn thông tin!' }]}
      >
        <Select
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Trạng thái"
          options={listRoomStatus}
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
        label="Dịch vụ vệ sinh"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          disabled={isDisable}
          placeholder="Dịch vụ vệ sinh"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="bike"
        label="Gửi xe máy"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Gửi xe máy"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="oto"
        label="Gửi xe ô tô"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Gửi xe ô tô"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="rash"
        label="Phí rác thải"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Phí rác thải"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="wash"
        label="Máy giặt"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Máy giặt"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="wifi"
        label="Wifi"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Wifi"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="upload"
        label="Ảnh quảng cáo"
        rules={[
          { required: true, message: 'Vui lòng tải lên ảnh' },
          {
            validator: () => {
              if (!fileList || fileList.length === 0) {
                return Promise.reject(new Error('Vui lòng tải lên ảnh'));
              }

              const maxSize = 1024 * 1024 * 1;
              const img = fileList[0];
              if (Number(img?.size) > maxSize) {
                return Promise.reject(
                  new Error('Kích thước ảnh không được vượt quá 1MB'),
                );
              }
              new Error('');
              return Promise.resolve();
            },
          },
        ]}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          maxCount={1}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </Form.Item>
      <Form.Item
        name="uploadList"
        label="Ảnh phòng"
        rules={[
          { required: true, message: 'Vui lòng tải lên ảnh' },
          {
            validator: () => {
              if (!fileImg || fileImg.length === 0) {
                return Promise.reject(new Error('Vui lòng tải lên ảnh'));
              }

              const maxSize = 1024 * 1024 * 1;
              for (const item of fileImg) {
                if (Number(item?.size) > maxSize) {
                  return Promise.reject(
                    new Error('Kích thước mỗi ảnh không được vượt quá 1MB'),
                  );
                }
              }
              new Error('');
              return Promise.resolve();
            },
          },
        ]}
      >
        <Upload
          listType="picture-card"
          fileList={fileImg}
          onChange={onChangeImg}
          onPreview={onPreview}
          maxCount={5}
        >
          {fileImg.length < 5 && '+ Upload'}
        </Upload>
      </Form.Item>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      <Form.Item name="tienIchPhong" label="Tiện ích phòng">
        <Checkbox.Group>
          <Flex gap={20} wrap>
            <Checkbox value="Cửa sổ giếng trời">Cửa sổ</Checkbox>
            <Checkbox value="WC riêng">WC riêng</Checkbox>
            <Checkbox value="Wifi">Wifi</Checkbox>
            <Checkbox value="Ban công">Ban công</Checkbox>
          </Flex>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item name="tienNghiPhong" label="Tiện nghi phòng">
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
      <Form.Item name="tienIchTrongNha" label="Tiện nghi trong nhà">
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
      <Form.Item name="tienIchXungQuanh" label="Tiện nghi xung quanh">
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

export default CreateForm;
