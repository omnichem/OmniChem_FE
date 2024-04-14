import React, { useState } from 'react';

import { Flex, Tabs } from 'antd';
import styled from 'styled-components';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Logo } from '../../shared/components';
import { useAuth } from '../../contexts/authContext';

interface AuthFormProps {}

export const AuthForm: React.FC<AuthFormProps> = ({}) => {
  const { isAuthorized } = useAuth();
  const [items] = useState([
    {
      key: '1',
      label: 'Войти в систему',
      children: <LoginForm />,
    },
    {
      key: '2',
      label: 'Зарегистрироваться в системе',
      children: <RegisterForm />,
    },
  ]);
  return (
    <AuthFormWrapper vertical align="center">
      <Logo width={300} height={170} />
      {isAuthorized ? (
        <Flex align="center" vertical>
          <h2>Вы успешно вошли</h2>
          <p>Теперь вы можете закрыть это окно и продолжить пользоваться сайтом</p>
        </Flex>
      ) : (
        <Flex vertical align="center" style={{ width: '100%' }} gap={10}>
          <h2 style={{ fontSize: '27px' }}>Добро пожаловать в OmniChem!</h2>
          <p>Выберите, что вы хотите сделать:</p>
          <Tabs defaultActiveKey="1" type="card" size={'large'} items={items} />
        </Flex>
      )}
    </AuthFormWrapper>
  );
};

export const AuthFormWrapper = styled(Flex)`
  width: 100%;
`;
