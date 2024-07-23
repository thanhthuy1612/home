'use client';

import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
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
import { listRoomStatus, listRoomTypeCreate } from '@/default/list';
import { RcFile } from 'antd/es/upload';
import handlePosts from '../api/HandPosts';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/utils/useNotification';
import { defaultCity, hcm, hn } from '@/default/city';
import { ISelected } from '@/interface/ISelected';

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
  const [listQuan, setListQuan] = React.useState<ISelected[]>([]);
  const [city, setCity] = React.useState(undefined);

  const [form] = Form.useForm();
  const router = useRouter();
  const { setNotification } = useNotification();

  React.useEffect(() => {
    switch (form.getFieldsValue().city) {
      case 'Hà Nội':
        setListQuan(hn);
        break;
      case 'Hồ Chí Minh':
        setListQuan(hcm);
        break;
      default:
        setListQuan([]);
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const onFinish: FormProps['onFinish'] = async (values) => {
    if (fileList.length > 0 && fileImg.length > 0) {
      setIsDisable(true);
      const formData = new FormData();
      const service = {
        TienIchPhong: values.tienIchPhong ?? [],
        TienNghiPhong: values.tienNghiPhong ?? [],
        TienIchTrongNha: values.tienIchTrongNha ?? [],
        TienIchXungQuanh: values.tienIchXungQuanh ?? [],
      };

      const price = {
        Dien: values.electric,
        Nuoc: values.water,
        DichVuVeSinh: values.control,
        RacThai: values.rash,
        GiuXeMay: values.bike,
        GiuOto: values.oto,
        MayGiat: values.wash,
        Wifi: values.wifi,
      };

      const fileListImg = fileImg.reduce((res: File[], item) => {
        const file = (item as UploadFile).originFileObj as File;
        return [...res, file];
      }, []);

      const address = `${values.address}, ${values.quan}, ${values.city}`;

      formData.append('Title', values.name);
      formData.append('Description', values.description);
      formData.append(
        'PreviewPicture',
        (fileList[0] as UploadFile).originFileObj as File,
      );
      formData.append('Address', address);
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
        tooltip="Yêu cầu nhập ít hơn 255 ký tự"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 255, message: 'Vui lòng nhập ít hơn 255 ký tự' },
        ]}
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
          placeholder="Giá thuê phòng"
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
        tooltip="Yêu cầu nhập ít hơn 4000 ký tự"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 4000, message: 'Vui lòng nhập ít hơn 4000 ký tự' },
        ]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Mô tả"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="city"
        label="Thành phố/Tỉnh"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Select
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Thành phố/Tỉnh"
          options={defaultCity}
          value={city}
          onChange={(value) => {
            setListQuan([]);
            form.setFieldValue('quan', undefined);
            setCity(value);
          }}
        />
      </Form.Item>
      <Form.Item
        name="quan"
        label="Quận/Huyện"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <Select
          className=" w-[100%]"
          disabled={isDisable || listQuan.length === 0}
          placeholder="Quận/Huyện"
          options={listQuan}
        />
      </Form.Item>
      <Form.Item
        name="address"
        label="Số nhà"
        tooltip="Yêu cầu nhập ít hơn 124 ký tự"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin!' },
          { max: 124, message: 'Vui lòng nhập ít hơn 124 ký tự' },
        ]}
      >
        <Input
          className=" w-[100%]"
          disabled={isDisable}
          placeholder="Số nhà"
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
          placeholder="Số người tối đa"
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
          options={listRoomTypeCreate}
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
        <InputNumber<number>
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, '') as unknown as number
          }
          addonAfter="VNĐ / kW"
          className=" w-[100%]"
          min={0}
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
        <InputNumber<number>
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, '') as unknown as number
          }
          addonAfter="VNĐ / khối"
          className=" w-[100%]"
          min={0}
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
        <InputNumber<number>
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, '') as unknown as number
          }
          addonAfter="VNĐ / phòng"
          disabled={isDisable}
          placeholder="Dịch vụ vệ sinh"
          className=" w-[100%]"
          min={0}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="bike"
        label="Gửi xe máy"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
      >
        <InputNumber<number>
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, '') as unknown as number
          }
          addonAfter="VNĐ / xe"
          className=" w-[100%]"
          min={0}
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
        <InputNumber<number>
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, '') as unknown as number
          }
          addonAfter="VNĐ / xe"
          className=" w-[100%]"
          min={0}
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
        <InputNumber<number>
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, '') as unknown as number
          }
          addonAfter="VNĐ / người"
          className=" w-[100%]"
          min={0}
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
        <InputNumber<number>
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, '') as unknown as number
          }
          addonAfter="VNĐ / người"
          className=" w-[100%]"
          min={0}
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
        <InputNumber<number>
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, '') as unknown as number
          }
          addonAfter="VNĐ / người"
          className=" w-[100%]"
          min={0}
          disabled={isDisable}
          placeholder="Wifi"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="upload"
        label="Ảnh quảng cáo"
        tooltip="Yêu cầu tải ảnh kích thước nhỏ hơn 250KB, định dạng .png hoặc .jpg"
        rules={[
          { required: true, message: 'Vui lòng tải lên ảnh' },
          {
            validator: () => {
              if (!fileList) {
                return Promise.resolve();
              }
              if (fileList.length === 0) {
                return Promise.reject(new Error('Vui lòng tải lên ảnh'));
              }

              const maxSize = 1024 * 250;
              const img = fileList[0];
              const isPNG =
                img.type === 'image/png' || img.type === 'image/jpeg';
              if (!isPNG) {
                return Promise.reject(
                  new Error('Định dạng ảnh .png hoặc .jpg'),
                );
              }
              if (Number(img?.size) > maxSize) {
                return Promise.reject(
                  new Error('Kích thước ảnh không được vượt quá 250KB'),
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
        tooltip="Yêu cầu tải nhiều nhất 5 ảnh, kích thuớc mối ảnh nhỏ hơn 250KB, định dạng .png hoặc .jpg"
        rules={[
          { required: true, message: 'Vui lòng tải lên ảnh' },
          {
            validator: () => {
              if (!fileImg) {
                return Promise.resolve();
              }
              if (fileImg.length === 0) {
                return Promise.reject(new Error('Vui lòng tải lên ảnh'));
              }

              const maxSize = 1024 * 250;
              for (const item of fileImg) {
                if (Number(item?.size) > maxSize) {
                  const isPNG =
                    item.type === 'image/png' || item.type === 'image/jpeg';
                  if (!isPNG) {
                    return Promise.reject(
                      new Error('Định dạng ảnh .png hoặc .jpg'),
                    );
                  }
                  return Promise.reject(
                    new Error('Kích thước mỗi ảnh không được vượt quá 250 KB'),
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
          alt='previewImage'
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
              Trung Tâm Thương Mại
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
