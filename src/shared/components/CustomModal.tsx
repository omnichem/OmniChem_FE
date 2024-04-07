import React from 'react';
import { Modal } from 'antd';

interface CustomModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  handleModalCancel: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({ children, isModalOpen, handleModalCancel }) => {
  return (
    <Modal footer={false} centered open={isModalOpen} onCancel={handleModalCancel}>
      {children}
    </Modal>
  );
};
