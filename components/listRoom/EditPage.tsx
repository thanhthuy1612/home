'use client';

import handleAdmin from '@/app/api/HandAdmin';
import handlePosts from '@/app/api/HandPosts';
import { Role } from '@/enum/Role';
import { IPost } from '@/interface/IPost';
import { IStatusCode } from '@/interface/IStatusCode';
import { useAppSelector } from '@/lib/hooks';
import { Drawer, UploadFile } from 'antd';
import React from 'react';
import EditForm from './EditForm';

export interface IEditPage {
  id: string;
  onClose: () => void;
  open: boolean;
}
const EditPage: React.FC<IEditPage> = ({ id, open, onClose }) => {
  const [initData, setInitData] = React.useState<any>();
  const [initImg, setInitImg] = React.useState<UploadFile[]>([]);
  const [initListImg, setInitListImg] = React.useState<UploadFile[]>([]);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { role } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    const getListImg = async (item: IPost) => {
      let list = [];

      for (var i of item?.pictures ?? []) {
        const res = await handlePosts.getImg(item?.id ?? '', i ?? '');
        list.push({
          uid: i,
          name: i,
          status: 'done',
          url: res,
        } as UploadFile);
      }
      return list;
    };
    const fetch = async () => {
      setIsLoading(true);
      const res =
        role === Role.Admin
          ? await handleAdmin.getPostAdmin(id)
          : await handlePosts.getPost(id);
      if (res?.status === IStatusCode.SUCCESS && res?.data?.id) {
        const image = await handlePosts.getImg(
          id ?? '',
          res?.data?.previewPicture ?? '',
        );

        const img = [
          {
            uid: res?.data?.previewPicture ?? '',
            name: res?.data?.previewPicture ?? '',
            status: 'done',
            url: image,
          } as UploadFile,
        ];
        setInitImg(img);
        const list = await getListImg(res?.data);
        setInitListImg(list);
        const arrayAddress = res?.data?.address?.toString().split(', ');
        let address = res?.data?.address;
        let city = undefined;
        let quan = undefined;
        if (arrayAddress.length > 2) {
          city = arrayAddress[arrayAddress.length - 1];
          quan = arrayAddress[arrayAddress.length - 2];

          address = arrayAddress.slice(0, arrayAddress.length - 2).join(', ');
        }
        const init = {
          name: res?.data?.title,
          description: res?.data?.description,
          address,
          city,
          quan,
          people: res?.data?.maxPeople,
          price: res?.data?.price,
          roomType: res?.data?.roomType.toString(),
          roomStatus: res?.data?.roomStatus.toString(),
          electric: res?.data?.priceTags?.Dien,
          water: res?.data?.priceTags?.Nuoc,
          bike: res?.data?.priceTags?.GiuXeMay,
          oto: res?.data?.priceTags?.GiuOto,
          rash: res?.data?.priceTags?.RacThai,
          wash: res?.data?.priceTags?.MayGiat,
          wifi: res?.data?.priceTags?.Wifi,
          control: res?.data?.priceTags?.DichVuVeSinh,
          tienIchPhong: res?.data?.serviceTags?.TienIchPhong,
          tienNghiPhong: res?.data?.serviceTags?.TienNghiPhong,
          tienIchTrongNha: res?.data?.serviceTags?.TienIchTrongNha,
          tienIchXungQuanh: res?.data?.serviceTags?.TienIchXungQuanh,
          uploadList: list,
          upload: img,
        };
        setInitData(init);
        setIsLoading(false);
      }
    };
    id && open && fetch();
  }, [id, role, open]);
  return (
    <>
      <Drawer
        title="Chỉnh sửa phòng"
        size="large"
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 48,
          },
        }}
      >
        {isLoading ? (
          <div className="flex justify-center mt-[48px]">...Đang tải</div>
        ) : (
          <EditForm
            id={id}
            initData={initData}
            initImg={initImg}
            initListImg={initListImg}
          />
        )}
      </Drawer>
    </>
  );
};

export default EditPage;
