import { Button, Flex } from 'antd';
import React from 'react';
import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Role } from '@/enum/Role';

export interface IListRoom {
  title: string;
  fetchData: (isFirst?: boolean) => Promise<void>;
  role?: Role;
}

const ListItem = dynamic(() => import('./ListItem'), {
  loading: () => <Loading />,
  ssr: false,
});

const ListRoom: React.FC<IListRoom> = (props) => {
  const { title, fetchData, role } = props;

  const router = useRouter();
  return (
    <div className="px-[24px] mb-[24px]">
      {role === Role.Saler && (
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
      <ListItem role={role} fetchData={fetchData} />
    </div>
  );
};

export default ListRoom;
