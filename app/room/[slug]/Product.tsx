'use client';

import { Descriptions, Flex, DescriptionsProps, Modal, Image } from 'antd';
import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import { IPost } from '@/interface/IPost';
import { listPostStatus, listRoomStatus, listRoomType } from '@/default/list';
import handlePosts from '@/app/api/HandPosts';
import Loading from './loading';
import Info from './Info';
import { Role } from '@/enum/Role';
import dynamic from 'next/dynamic';

export interface List {
  title: string;
  contents: string[];
}

export interface IProduct {
  item?: IPost;
}

const PriceProduct = dynamic(() => import('./PriceProduct'), {
  loading: () => <></>,
  ssr: false,
});
const Product: React.FC<IProduct> = ({ item }) => {
  const [img, setImg] = React.useState<string>();
  const [imgList, setImgList] = React.useState<string[]>([]);
  const [items, setItems] = React.useState<DescriptionsProps['items']>([]);

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
    ];

    const adminList = [
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
    ];
    const init: List[] = [
      {
        title: 'Tiện ích phòng',
        contents: item?.serviceTags['TienIchPhong'],
      },
      {
        title: 'Tiện nghi phòng',
        contents: item?.serviceTags['TienNghiPhong'],
      },
      {
        title: 'Tiện nghi trong nhà',
        contents: item?.serviceTags['TienIchTrongNha'],
      },
      {
        title: 'Tiện ích xung quanh',
        contents: item?.serviceTags['TienIchXungQuanh'],
      },
    ];

    const items: DescriptionsProps['items'] = init.map((item) => {
      return {
        key: item.title,
        label: item.title,
        children: (
          <Flex wrap gap={8}>
            {item.contents.map((content) => (
              <div key={content}>{content},</div>
            ))}
          </Flex>
        ),
      };
    });
    setItems(
      role !== Role.Admin
        ? [...initState, ...items]
        : [...initState, ...adminList],
    );
  }, [item, role]);

  return (
    <Flex className=" flex-col items-center py-[24px] px-[24px]">
      <Flex justify="center">
        <div className=" mb-[24px] font-[600] text-[25px]">
          {item?.title?.toLocaleUpperCase()}
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
          gap={10}
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
                    className=" bg-coborder-colorPrimary flex justify-center items-center"
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
          <div className=" border-[1px] rounded-[15px] p-[16px]">
            <div className=" font-[600] mb-[8px] border-b-[1px] w-fit border-colorSelect">
              THÔNG TIN MÔ TẢ
            </div>
            <div>{item?.description}</div>
          </div>
          <div className=" mt-[16px] border-[1px] rounded-[15px] p-[16px]">
            <div className=" font-[600] mb-[8px] border-b-[1px] w-fit border-colorSelect">
              ĐẶC ĐIỂM TIN ĐĂNG
            </div>
            <Descriptions items={items} column={{ xs: 1, sm: 1, md: 2 }} />
          </div>
          <PriceProduct
            className=" mt-[16px] border-[1px] rounded-[15px] p-[16px]"
            price={item?.price}
            priceTag={item?.priceTags}
          />
        </Flex>
      </Flex>
      <div className=" w-[100%] mt-[16px]">
        {role === Role.Admin && (
          <Info
            className=" mt-[16px] border-[1px] rounded-[15px] p-[16px]"
            item={item?.ownerInformation}
          />
        )}
      </div>
    </Flex>
  );
};

export default Product;
