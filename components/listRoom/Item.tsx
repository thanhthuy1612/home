'use client';

import { useAppSelector } from '@/lib/hooks';
import {
  Button,
  Descriptions,
  DescriptionsProps,
  Flex,
  Image,
  Modal,
} from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';
import { DataType } from '@/lib/features/listRoom';
import { listPostStatus, listRoomStatus, listRoomType } from '@/default/list';
import { dateFormat } from '@/utils/useTime';
import handlePosts from '@/app/api/HandPosts';
import { Role } from '@/enum/Role';
import { PostsStatus } from '@/enum/PostStatus';
import handleAdmin from '@/app/api/HandAdmin';
import { useNotification } from '@/utils/useNotification';
import dynamic from 'next/dynamic';

const EditPage = dynamic(() => import('./EditPage'), {
  loading: () => <></>,
  ssr: false,
});

export interface IItem {
  item: DataType;
  role?: Role;
  fetchData: (isFirst?: boolean) => Promise<void>;
}
const Item: React.FC<IItem> = (props) => {
  const [items, setItems] = React.useState<DescriptionsProps['items']>([]);
  const [img, setImg] = React.useState<string>();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const { width } = useAppSelector((state) => state.login);
  const { role, item, fetchData } = props;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const { setNotification } = useNotification();

  React.useEffect(() => {
    const initState = [
      {
        key: '1',
        label: 'Mô tả',
        children: (
          <div className=" w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
            {item?.description}
          </div>
        ),
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
              key: '11',
              label: 'Trạng thái bài đăng',
              children: listPostStatus.find(
                (e) => Number(e.value) === item?.postsStatus,
              )?.label,
            },
          ]
        : initState,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const bookRoom = () => {
    router.push(`/room/${item?.id}`);
  };

  const activatePost = async () => {
    setIsLoading(true);
    const res = await handleAdmin.activatePost(item?.id);
    const action = async () => {
      await fetchData(true);
      setIsLoading(false);
    };
    setNotification(res, 'Duyệt bài thành công', action);
  };

  const inactivatePost = async () => {
    setIsLoading(true);
    const res = await handleAdmin.inactivatePost(item?.id);
    const action = async () => {
      await fetchData(true);
      setIsLoading(false);
    };
    setNotification(res, 'Ẩn bài thành công', action);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const res = await handlePosts.deletePost(item?.id);
    const action = async () => {
      await fetchData(true);
      setIsLoading(false);
      setIsModalOpen(false);
    };
    setNotification(res, 'Xóa bài thành công', action);
  };

  const renderBottom = () => {
    if (!role) {
      return (
        <Button
          type="primary"
          className=" hover:!bg-colorSelect"
          disabled={isLoading}
          onClick={bookRoom}
        >
          Xem thêm
        </Button>
      );
    }
    switch (role) {
      case Role.Saler:
        return (
          <Flex gap={20}>
            <Button disabled={isLoading} onClick={bookRoom}>
              Xem thêm
            </Button>
            <Button onClick={showDrawer}>Sửa</Button>
            <Button disabled={isLoading} onClick={() => setIsModalOpen(true)}>
              Xóa
            </Button>
          </Flex>
        );
      case Role.Admin:
        return (
          <Flex gap={20}>
            <Button disabled={isLoading} onClick={bookRoom}>
              Xem thêm
            </Button>
            {item?.postsStatus !== PostsStatus.DaDuyet && (
              <Button disabled={isLoading} onClick={activatePost}>
                {item?.postsStatus !== PostsStatus.DaAn ? 'Duyệt bài' : 'Hiện'}
              </Button>
            )}
            {item?.postsStatus !== PostsStatus.DaAn && (
              <Button disabled={isLoading} onClick={inactivatePost}>
                Ẩn
              </Button>
            )}
            <Button onClick={showDrawer}>Sửa</Button>
            <Button disabled={isLoading} onClick={() => setIsModalOpen(true)}>
              Xóa
            </Button>
          </Flex>
        );
    }
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
      <Image
        width={width < 1600 ? 200 : 300}
        height={width < 1600 ? 200 : 300}
        className=" object-cover"
        src={img}
        alt="img"
      />
      <Flex
        className=" flex-col justify-between"
        style={{ width: width < 1600 ? '100%' : 'calc(100% - 320px)' }}
      >
        <Descriptions
          title={
            <div
              className=" cursor-pointer w-fit hover:text-colorSelect"
              onClick={bookRoom}
            >
              {item?.title}
            </div>
          }
          items={items}
          column={{ xs: 1, sm: 1, md: 2 }}
        />
        <Flex gap={10} className=" mt-[10px] flex-col">
          <div className=" font-[600] text-colorError text-[20px]">
            {`${item?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / tháng
          </div>
          <div>{renderBottom()}</div>
        </Flex>
      </Flex>
      {open && <EditPage id={item?.id} open onClose={onClose} />}
      <Modal
        title="Hình ảnh"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        Bạn muốn xóa bài?
        <Flex className=" mt-[20px] justify-end w-[100%]">
          <Button disabled={isLoading} onClick={handleDelete}>
            Xác nhận
          </Button>
        </Flex>
      </Modal>
    </Flex>
  );
};

export default Item;
