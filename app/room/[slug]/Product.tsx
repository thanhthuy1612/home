'use client';

import { Descriptions, Flex, DescriptionsProps, Modal, Image } from 'antd';
import React from 'react';
import { List } from './ItemProduct';
import { useAppSelector } from '@/lib/hooks';
import { IPost } from '@/interface/IPost';
import { listPostStatus, listRoomStatus, listRoomType } from '@/default/list';
import handlePosts from '@/app/api/HandPosts';
import Loading from './loading';
import Info from './Info';
import { Role } from '@/enum/Role';
import dynamic from 'next/dynamic';

export interface IProduct {
  item?: IPost;
}
const Contact = dynamic(() => import('./Contact'), {
  loading: () => <></>,
  ssr: false,
});
const ItemProduct = dynamic(() => import('./ItemProduct'), {
  loading: () => <></>,
  ssr: false,
});
const PriceProduct = dynamic(() => import('./PriceProduct'), {
  loading: () => <></>,
  ssr: false,
});
const Product: React.FC<IProduct> = ({ item }) => {
  const [img, setImg] = React.useState<string>();
  const [imgList, setImgList] = React.useState<string[]>([]);
  const [items, setItems] = React.useState<DescriptionsProps['items']>([]);
  const [listIntroduce, setListIntroduce] = React.useState<List[]>([]);

  const { width } = useAppSelector((state) => state.login);
  const { role } = useAppSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  React.useEffect(() => {
    const getListImg = async () => {
      let list = [];

      for (var i of item?.pictures ?? []) {
        const res = await handlePosts.getImg(item?.id ?? '', i ?? '');
        list.push(res);
      }
      return list;
    };
    const fetchImg = async () => {
      setIsLoading(true);
      const image = await handlePosts.getImg(
        item?.id ?? '',
        item?.previewPicture ?? '',
      );
      setImg(image);
      const list = await getListImg();
      setImgList(list);
      setIsLoading(false);
    };
    fetchImg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        key: '11',
        label: 'Trạng thái bài đăng',
        children: listPostStatus.find(
          (e) => Number(e.value) === item?.postsStatus,
        )?.label,
      },
      {
        key: '12',
        label: 'Chủ sở hữu',
        children: item?.owner,
      },
    ];
    const init: List[] = [
      {
        title: 'TIỆN ÍCH PHÒNG',
        contents: item?.serviceTags['TienIchPhong'],
      },
      {
        title: 'TIỆN NGHI PHÒNG',
        contents: item?.serviceTags['TienNghiPhong'],
      },
      {
        title: 'TIỆN NGHI TRONG NHÀ',
        contents: item?.serviceTags['TienIchTrongNha'],
      },
      {
        title: 'TIỆN ÍCH XUNG QUANH',
        contents: item?.serviceTags['TienIchXungQuanh'],
      },
    ];
    setItems(initState);
    setListIntroduce(init);
  }, [item]);

  return (
    <Flex className=" flex-col items-center py-[24px] px-[48px]">
      <Flex justify="center">
        <div className=" mb-[24px] font-[600] text-[25px]">
          {item?.title}
        </div>
      </Flex>
      <Flex
        gap={20}
        wrap
        style={{ flexDirection: width < 1600 ? 'column' : 'row' }}
      >
        <Flex
          style={{
            flexDirection: 'column',
            width: width < 1600 ? '300px' : '500px',
          }}
          gap={20}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Image
                style={{
                  width: width < 1600 ? `300px` : `500px`,
                  height: width < 1600 ? `300px` : `500px`,
                }}
                height={width < 1600 ? 300 : 500}
                width={width < 1600 ? 300 : 500}
                src={img ?? ''}
                alt="pre"
                className=" object-cover"
              />
              <Flex gap={10} wrap>
                {(imgList.length <= 2 ? imgList : imgList.slice(2)).map(
                  (imgItem, index) => (
                    <Image
                      key={index}
                      style={{
                        width:
                          width < 1600
                            ? `${(300 - 20) / 3}px`
                            : `${(500 - 20) / 3}px`,
                        height:
                          width < 1600
                            ? `${(300 - 20) / 3}px`
                            : `${(500 - 20) / 3}px`,
                      }}
                      height={width < 1600 ? (300 - 20) / 3 : (500 - 20) / 3}
                      width={width < 1600 ? (300 - 20) / 3 : (500 - 20) / 3}
                      src={imgItem ?? ''}
                      alt={index.toString()}
                      className=" object-cover"
                    />
                  ),
                )}
                {imgList.length > 2 && (
                  <div
                    onClick={showModal}
                    style={{
                      width:
                        width < 1600
                          ? `${(300 - 20) / 3}px`
                          : `${(500 - 20) / 3}px`,
                      height:
                        width < 1600
                          ? `${(300 - 20) / 3}px`
                          : `${(500 - 20) / 3}px`,
                    }}
                    className=" bg-borderHeader flex justify-center items-center"
                  >
                    Xem thêm
                  </div>
                )}
                <Modal
                  title="Hình ảnh"
                  open={isModalOpen}
                  onCancel={() => {
                    setIsModalOpen(false);
                  }}
                  footer={null}
                >
                  <Flex wrap gap={10}>
                    {[img, ...imgList].map((imgItem, index) => (
                      <Image
                        key={index}
                        style={{
                          width:
                            width < 1600
                              ? `${(300 - 20) / 3}px`
                              : `${(500 - 20) / 3}px`,
                          height:
                            width < 1600
                              ? `${(300 - 20) / 3}px`
                              : `${(500 - 20) / 3}px`,
                        }}
                        height={width < 1600 ? (300 - 20) / 3 : (500 - 20) / 3}
                        width={width < 1600 ? (300 - 20) / 3 : (500 - 20) / 3}
                        src={imgItem ?? ''}
                        alt={index.toString()}
                        className=" object-cover"
                      />
                    ))}
                  </Flex>
                </Modal>
              </Flex>
            </>
          )}
        </Flex>
        <Flex
          className=" flex-col"
          style={{ width: width < 1600 ? '100%' : 'calc(100% - 520px)' }}
        >
          <Descriptions items={items} column={{ xs: 1, sm: 1, md: 2 }} />
          <PriceProduct price={item?.price} priceTag={item?.priceTags} />
          <Contact />
        </Flex>
      </Flex>
      <div className=" w-[100%] mt-[24px]">
        {role === Role.Admin && <Info item={item?.ownerInformation} />}
        <ItemProduct list={listIntroduce} />
      </div>
    </Flex>
  );
};

export default Product;
