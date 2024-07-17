import { Button, Flex } from 'antd';
import React from 'react';
import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export interface IListRoom {
  title: string;
  fetchData: () => Promise<void>;
  isMyAccount?: boolean;
}

const ListItem = dynamic(() => import('./ListItem'), {
  loading: () => <Loading />,
  ssr: false,
});

const ListRoom: React.FC<IListRoom> = (props) => {
  const { title, fetchData, isMyAccount } = props;

  const router = useRouter();
  return (
    <div className="px-[48px] mb-[24px]">
      {isMyAccount && (
        <Button
          icon={<PlusOutlined />}
          className=" mt-[24px]"
          size="large"
          onClick={() => router.push('/create')}
        >
          Thêm phòng mới
        </Button>
      )}
      <Flex className=" items-center justify-between py-[24px]">
        <div className=" font-[600] text-[20px] w-fit">{title}</div>
      </Flex>
      <ListItem isMyAccount={isMyAccount} fetchData={fetchData} />
    </div>
  );
};

export default ListRoom;
