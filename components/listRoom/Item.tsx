'use client';

import { useAppSelector } from '@/lib/hooks';
import { Button, Descriptions, DescriptionsProps, Flex, Image } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';
import { DataType } from '@/lib/features/listRoom';
import { listPostStatus, listRoomStatus, listRoomType } from '@/default/list';
import { dateFormat } from '@/utils/useTime';
import handlePosts from '@/app/api/HandPosts';
import { Role } from '@/enum/Role';

export interface IItem {
  item: DataType;
  role?: Role;
}
const Item: React.FC<IItem> = (props) => {
  const [items, setItems] = React.useState<DescriptionsProps['items']>([]);
  const [img, setImg] = React.useState<string>();
  const { width } = useAppSelector((state) => state.login);
  const { role, item } = props;

  const router = useRouter();

  React.useEffect(() => {
    const initState = [
      {
        key: '1',
        label: 'Mô tả',
        children: item?.description,
      },
      {
        key: '2',
        label: 'Địa chỉ',
        children: item?.address,
      },
      {
        key: '3',
        label: 'Số người tối đa',
        children: item?.maxPeople,
      },
      {
        key: '5',
        label: 'Kiểu phòng',
        children: listRoomType.find((e) => Number(e.value) === item?.roomType)
          ?.label,
      },
      {
        key: '6',
        label: 'Trạng thái phòng',
        children: listRoomStatus.find(
          (e) => Number(e.value) === item?.roomStatus,
        )?.label,
      },
      {
        key: '7',
        label: 'Thời gian cập nhật',
        children: dateFormat(item?.updatedTime),
      },
    ];
    setItems(
      role
        ? [
            ...initState,
            {
              key: '10',
              label: 'Giá',
              children: `${item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / tháng`,
            },
            {
              key: '11',
              label: 'Trạng thái bài đăng',
              children: listPostStatus.find(
                (e) => Number(e.value) === item?.postsStatus,
              )?.label,
            },
          ]
        : initState,
    );
  }, [item]);

  const bookRoom = () => {
    router.push(`/room/${item?.id}`);
  };

  React.useEffect(() => {
    const fetchImg = async () => {
      const image = await handlePosts.getImg(item?.id, item?.previewPicture);
      setImg(image);
    };
    item?.id && item?.previewPicture && fetchImg();
  }, [item?.id, item?.previewPicture]);
  return (
    <Flex
      className=" py-[10px] border-b-[2px] border-borderHeader"
      style={{ flexDirection: width < 1600 ? 'column' : 'row' }}
      wrap
      gap={20}
    >
      <Image width={200} height={200} className=" object-cover" src={img} />
      <Flex
        className=" flex-col justify-between"
        style={{ width: width < 1600 ? '100%' : 'calc(100% - 240px)' }}
      >
        <Descriptions
          title={
            <div
              className=" cursor-pointer w-fit text-[20px] font-[600] underline hover:text-colorSelect"
              onClick={bookRoom}
            >
              {item?.title}
            </div>
          }
          items={items}
          column={{ xs: 1, sm: 1, md: 2 }}
        />
        {!role ? (
          <Button
            type="primary"
            className=" w-[250px] hover:!bg-colorSelect"
            onClick={bookRoom}
          >
            {`${item?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / tháng
          </Button>
        ) : (
          <Flex gap={20}>
            <Button>Sửa</Button>
            <Button>Xóa</Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Item;
