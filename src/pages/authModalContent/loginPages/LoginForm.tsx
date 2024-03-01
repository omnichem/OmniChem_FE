import React, { useState } from 'react';
import styled from 'styled-components';
import { Logo } from '../../../components';
import { LogSupplierForm } from './LogSupplierForm';
import { LogBuyerForm } from './LogBuyerForm';
import { Tabs } from 'antd';

interface LoginFormProps {
  registerButton: () => void;
  submitBuyerLogin: () => void;
  submitSupplierLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ submitBuyerLogin, submitSupplierLogin, registerButton }) => {



  const [items, setItems] = useState([
    {
      key: '1',
      label: 'Поставщик',
      children: <LogSupplierForm submitBuyerLogin={submitSupplierLogin} registerButton={registerButton} />,
    },
    {
      key: '2',
      label: 'Покупатель',
      children: <LogBuyerForm submitBuyerLogin={submitBuyerLogin} registerButton={registerButton} />,
    },

  ]);
  return (
    <RegisterFormWrapper>
      <Logo width={300} height={170} />
      <h2 style={{ fontSize: "27px" }}>С возвращением в OmniChem!</h2>
      <p>Выберите, как вы хотите войти:</p>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"large"}
        items={items}
      />

    </RegisterFormWrapper>
  );
};

const RegisterFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`