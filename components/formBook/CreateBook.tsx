'use client';

import { Button, Divider, Modal } from 'antd';
import React from 'react';
import FormBook from './FormBook';
import { useAppSelector } from '@/lib/hooks';
import { DescriptionsItemType } from 'antd/es/descriptions';
export interface ICreateBookProps {
  isOpen: boolean;
  onDismiss: () => void;
  title?: string;
  id?: string;
}
const CreateBook: React.FC<ICreateBookProps> = ({
  isOpen,
  title,
  onDismiss,
  id,
}) => {
  const { width } = useAppSelector((state) => state.login);
  return (
    <Modal
      title={`Đặt lịch xem phòng ${title}`}
      open={isOpen}
      onCancel={onDismiss}
      footer={false}
      width={width < 1600 ? '100%' : '800px'}
    >
      <FormBook id={id} onDismiss={onDismiss} />
    </Modal>
  );
};

export default CreateBook;
