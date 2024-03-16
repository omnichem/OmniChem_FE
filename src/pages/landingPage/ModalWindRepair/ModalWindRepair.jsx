import React, { useState } from 'react';
import { Modal } from 'antd';
import './modalWindRepair.css'

const ModalWindRepair = ({modalWindtitle, modalText, modalImg}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal title={modalWindtitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="modalWindRepair">
          <img src={modalImg} alt="картинка ремонта" />
          <h2 className="modalWindRepair_title">{modalWindtitle}</h2>
          <p>{modalText}</p>
        </div>
      </Modal>
    </>
  );
};

export default ModalWindRepair;