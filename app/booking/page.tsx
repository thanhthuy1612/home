'use client';

import { DataType } from '@/lib/features/listRoom';
import { dateFormat } from '@/utils/useTime';
import { defaultPageSize } from '@/utils/utils';
import { Button, Space, Table, Tooltip } from 'antd';
import type { TableColumnsType, TablePaginationConfig, TableProps } from 'antd';
import React from 'react';
import handleAdmin from '../api/HandAdmin';
import { BookingStatus } from '@/enum/BookStatus';
import { IStatusCode } from '@/interface/IStatusCode';
import ItemCard from '@/components/listRoom/ItemCard';

interface TableType {
  id: string;
  postsId: string;
  fullname: string;
  phone: string;
  email: string;
  facebook: string;
  zalo: string;
  bookingDate: Date;
  creationDate: Date;
  status: number;
  posts: DataType;
}

const Booking: React.FC = () => {
  const [pagination, setPagination] = React.useState<TablePaginationConfig>({
    current: 1,
    pageSize: defaultPageSize,
  });
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<TableType[]>([]);
  const columns: TableColumnsType<TableType> = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Link facebook',
      dataIndex: 'facebook',
      key: 'facebook',
    },
    {
      title: 'Link zalo',
      dataIndex: 'zalo',
      key: 'zalo',
    },
    {
      title: 'Thời gian xem phòng',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
      render: (date: Date) => <>{dateFormat(date)}</>,
    },
    {
      title: 'Phòng',
      dataIndex: 'posts',
      key: 'posts',
      render: (posts: DataType) => (
        <Tooltip
          title={
            <div className=" w-[300px]">
              <ItemCard item={posts} fetchData={async () => {}} disableAction />
            </div>
          }
        >
          <div className=' cursor-pointer'>{posts?.title}</div>
        </Tooltip>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record?.status === BookingStatus.ChuaXuLy && (
            <Button onClick={() => handleUpdate(record?.id)}>Xử lý</Button>
          )}
          <Button onClick={() => handleDelete(record?.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  const handleUpdate = async (id: string) => {
    const res = await handleAdmin.updateBooking(id);
    if (res.status === IStatusCode.SUCCESS) {
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await handleAdmin.deleteBooking(id);
    if (res.status === IStatusCode.SUCCESS) {
      fetchData();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await handleAdmin.getListBooking({
      size: defaultPageSize,
      index: pagination?.current ?? 1,
    });
    setData(res?.data?.values ?? []);
    setPagination({
      current: pagination.current,
      pageSize: defaultPageSize,
      total: res?.data?.total,
    });
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination?.current]);

  const handleTableChange: TableProps['onChange'] = (
    pagination: TablePaginationConfig,
  ) => {
    setPagination(pagination);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Booking;
