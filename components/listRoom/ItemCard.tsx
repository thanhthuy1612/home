'use client';

import handleAdmin from '@/app/api/HandAdmin';
import handlePosts from '@/app/api/HandPosts';
import { listPostStatus, listRoomStatus, listRoomType } from '@/default/list';
import { PostsStatus } from '@/enum/PostStatus';
import { Role } from '@/enum/Role';
import { DataType } from '@/lib/features/listRoom';
import { useAppSelector } from '@/lib/hooks';
import { useNotification } from '@/utils/useNotification';
import { dateFormat } from '@/utils/useTime';
import {
  ClearOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FileImageOutlined,
  HomeOutlined,
  TeamOutlined,
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

const EditPage = dynamic(() => import('./EditPage'), {
  loading: () => <></>,
  ssr: false,
});

export interface IItemCard {
  item: DataType;
  role?: Role;
  fetchData: (isFirst?: boolean) => Promise<void>;
}
const ItemCard: React.FC<IItemCard> = (props) => {
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
        children: dateFormat(item?.updatedTime),
      },
    ];
    setItems(
      role
        ? [
            ...initState,
            {
              key: '11',
              label: <FileImageOutlined />,
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

  const renderBottom: () => Array<React.ReactNode> = () => {
    if (!role) {
      return [];
    }
    let base = [
      <Tooltip key={'Sua'} title="Sửa">
        <EditOutlined disabled={isLoading} onClick={showDrawer} />
      </Tooltip>,
      <Tooltip key={'Xoa'} title="Sửa">
        <ClearOutlined
          disabled={isLoading}
          onClick={() => setIsModalOpen(true)}
        />
      </Tooltip>,
    ];
    switch (role) {
      case Role.Saler:
        return base;
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
      loading={isLoading}
      cover={
        <div className=" relative">
          <Image
            width="100%"
            height={width < 1600 ? 200 : 300}
            className=" object-cover"
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
      actions={renderBottom()}
      onClick={bookRoom}
    >
      <Meta
        title={
          <Tooltip title={item?.title}>
            <div className=" w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
              {item?.title}
            </div>
          </Tooltip>
        }
        description={
          <Tooltip title={item?.address}>
            <div className=" w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
              {item?.address}
            </div>
          </Tooltip>
        }
      />
      <Descriptions className=" mt-[15px]" items={items} column={2} />
      <div className=" font-[600] text-colorError text-[20px]">
        {`${item?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ / tháng
      </div>
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
    </Card>
  );
};

export default ItemCard;
