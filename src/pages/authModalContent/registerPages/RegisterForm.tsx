import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Tabs } from 'antd';
import styled from 'styled-components';
import { Logo } from '../../../components';
import { RegSupplierForm } from './RegSupplierForm';
import { RegBuyerForm } from './RegBuyerForm';

interface RegisterFormProps {
  loginButton: () => void;
  submitBuyerRegister: () => void;
  submitSupplierRegister: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  loginButton,
  submitBuyerRegister,
  submitSupplierRegister,
}) => {
  const [items, setItems] = useState([
    {
      key: '1',
      label: 'Поставщик',
      children: <RegSupplierForm submitsupplierLogin={submitSupplierRegister} loginButton={loginButton} />,
    },
    {
      key: '2',
      label: 'Покупатель',
      children: <RegBuyerForm submitBuyerRegister={submitBuyerRegister} loginButton={loginButton} />,
    },
  ]);
  return (
    <RegisterFormWrapper>
      <Logo width={300} height={170} />
      <h2 style={{ fontSize: '27px' }}>Добро пожаловать в OmniChem!</h2>
      <p>Выберите, как вы хотите зарегистрироваться:</p>
      <Tabs defaultActiveKey="1" type="card" size={'large'} items={items} />
    </RegisterFormWrapper>
  );
};

const RegisterFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;
