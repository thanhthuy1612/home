'use client';

import handleAdmin from '@/app/api/HandAdmin';
import handlePosts from '@/app/api/HandPosts';
import { listRoomStatus, listRoomType } from '@/default/list';
import { PostsStatus } from '@/enum/PostStatus';
import { Role } from '@/enum/Role';
import { DataType } from '@/lib/features/listRoom';
import { useAppSelector } from '@/lib/hooks';
import { useNotification } from '@/utils/useNotification';
import { dateFormat } from '@/utils/useTime';
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  HomeOutlined,
  LockOutlined,
  PlusOutlined,
  TeamOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Flex,
  Image,
  Modal,
  Tooltip,
} from 'antd';
import Meta from 'antd/es/card/Meta';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';
import CreateBook from '../formBook/CreateBook';

const EditPage = dynamic(() => import('./EditPage'), {
  loading: () => <></>,
  ssr: false,
});

export interface IItemCard {
  item: DataType;
  role?: Role;
  fetchData: (isFirst?: boolean) => Promise<void>;
  disableAction?: boolean;
}
const ItemCard: React.FC<IItemCard> = (props) => {
  const [items, setItems] = React.useState<DescriptionsProps['items']>([]);
  const [img, setImg] = React.useState<string>();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenHold, setIsModalOpenHold] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openBook, setOpenBook] = React.useState(false);

  const { width } = useAppSelector((state) => state.login);
  const { id } = useAppSelector((state) => state.user);

  const { role, item, fetchData, disableAction } = props;

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
        key: '3',
        label: <TeamOutlined />,
        children: item?.maxPeople,
      },
      {
        key: '5',
        label: <HomeOutlined />,
        children: listRoomType.find((e) => Number(e.value) === item?.roomType)
          ?.label,
      },
      {
        key: '7',
        label: <ClockCircleOutlined />,
        children: <div className=" w-fit">{dateFormat(item?.updatedTime)}</div>,
      },
    ];
    setItems(initState);
  }, [item]);

  const bookRoom = () => {
    router.push(`/room/${item?.title.replace(' ', '_')}/${item?.id}`);
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

  const handleHold = async () => {
    setIsLoading(true);
    const res = await handlePosts.holdRoom(item?.id);
    const action = async () => {
      await fetchData(true);
      setIsLoading(false);
      setIsModalOpenHold(false);
    };
    setNotification(res, 'Giữ phòng thành công', action);
  };
  const handleUnhold = async () => {
    setIsLoading(true);
    const res = await handlePosts.unholdRoom(item?.id);
    const action = async () => {
      await fetchData(true);
      setIsLoading(false);
      setIsModalOpenHold(false);
    };
    setNotification(res, 'Bỏ giữ phòng thành công', action);
  };
  const renderBottom: () => Array<React.ReactNode> = () => {
    if (!role) {
      return [];
    }
    let base = [
      <Tooltip key={'Sua'} title="Sửa">
        <EditOutlined disabled={isLoading} onClick={showDrawer} />
      </Tooltip>,
      <Tooltip key={'Xoa'} title="Sửa">
        <DeleteOutlined
          disabled={isLoading}
          onClick={() => setIsModalOpen(true)}
        />
      </Tooltip>,
    ];
    switch (role) {
      case Role.Saler:
        return [
          <Tooltip key={'Xem'} title="Xem chi tiết">
            <EyeOutlined disabled={isLoading} onClick={bookRoom} />
          </Tooltip>,
          <Tooltip
            key={'Giu'}
            title={item?.holderId === id ? 'Bỏ giữ phòng' : 'Giữ phòng'}
          >
            {item?.holderId === id ? (
              <LockOutlined
                disabled={isLoading}
                onClick={() => setIsModalOpenHold(true)}
              />
            ) : (
              <UnlockOutlined
                disabled={isLoading}
                onClick={() => setIsModalOpenHold(true)}
              />
            )}
          </Tooltip>,
        ];
      case Role.Admin:
        if (item?.postsStatus !== PostsStatus.DaDuyet) {
          base = [
            <Tooltip
              key={'Duyet'}
              title={
                item?.postsStatus !== PostsStatus.DaAn ? 'Duyệt bài' : 'Hiện'
              }
            >
              <EyeOutlined disabled={isLoading} onClick={activatePost} />
            </Tooltip>,
            ...base,
          ];
        }
        if (item?.postsStatus !== PostsStatus.DaAn) {
          base = [
            <Tooltip key={'An'} title="Ẩn">
              <EyeInvisibleOutlined
                disabled={isLoading}
                onClick={inactivatePost}
              />
            </Tooltip>,
            ...base,
          ];
        }
        if (item?.holderId) {
          base = [
            <Tooltip key={'Giu'} title="Bỏ giữ phòng">
              <LockOutlined
                disabled={isLoading}
                onClick={() => setIsModalOpenHold(true)}
              />
            </Tooltip>,
            ...base,
          ];
        }
        return base;
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
    <Card
      hoverable
      className=" shadow-xl hover:shadow-2xl border-[1px]"
      cover={
        <div className=" relative rounded-t-[8px]">
          <Image
            width="100%"
            height={width < 1600 ? 200 : 300}
            className=" object-cover rounded-t-[8px]"
            src={img}
            alt="img"
          />
          <div className=" z-[10] absolute bottom-[15px] left-[5px] bg-colorPrimary text-bgColor py-[2px] px-[10px] rounded-[15px]">
            {
              listRoomStatus.find((e) => Number(e.value) === item?.roomStatus)
                ?.label
            }
          </div>
        </div>
      }
      actions={!disableAction ? renderBottom() : undefined}
    >
      <div onClick={bookRoom}>
        <Meta
          title={
            <Tooltip placement="topLeft" title={item?.title}>
              <div className=" w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                {item?.title}
              </div>
            </Tooltip>
          }
          description={
            <Tooltip placement="topLeft" title={item?.address}>
              <div className=" w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                {item?.address}
              </div>
            </Tooltip>
          }
        />
        <Descriptions className=" mt-[15px]" items={items} column={2} />
        <div className=" font-[600] text-colorError text-[20px] my-[8px]">
          {`${item?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / tháng
        </div>
      </div>
      {!role && (
        <Button
          type="primary"
          className="hover:bg-colorSelect mt-[8px] w-[100%]"
          disabled={isLoading}
          onClick={() => setOpenBook(true)}
          size="large"
        >
          Đặt lịch xem phòng
        </Button>
      )}
      {open && (
        <EditPage id={item?.id} open onClose={onClose} fetchData={fetchData} />
      )}
      {openBook && (
        <CreateBook
          title={item?.title}
          isOpen={openBook}
          onDismiss={() => setOpenBook(false)}
          id={item?.id}
        />
      )}
      <Modal
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
      <Modal
        open={isModalOpenHold}
        onCancel={() => {
          setIsModalOpenHold(false);
        }}
        footer={null}
      >
        {item?.holderId === id ? 'Bạn muốn bỏ giữ phòng' : 'Bạn muốn giữ phòng'}{' '}
        {item?.title}?
        <Flex className=" mt-[20px] justify-end w-[100%]">
          <Button
            disabled={isLoading}
            onClick={
              item?.holderId !== id && role !== Role.Admin
                ? handleHold
                : handleUnhold
            }
          >
            Xác nhận
          </Button>
        </Flex>
      </Modal>
    </Card>
  );
};

export default ItemCard;
