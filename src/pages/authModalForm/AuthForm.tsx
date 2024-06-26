import React, { useState } from 'react';

import { Flex, Tabs } from 'antd';
import styled from 'styled-components';
import { LoginForm } from '../../modules/auth/components/LoginForm';
import { RegisterForm } from '../../modules/auth/components/RegisterForm';

import { useAuth } from '../../contexts/authContext';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';

export const AuthForm: React.FC = () => {
  const { isAuthorized } = useAuth();
  const [items] = useState([
    {
      key: 'login',
      label: 'Войти в систему',
      children: <LoginForm />,
      icon: <UserOutlined />,
    },
    {
      key: 'register',
      label: 'Зарегистрироваться в системе',
      children: <RegisterForm />,
      icon: <UserAddOutlined />,
    },
  ]);
  return <Tabs defaultActiveKey="1" type="card" size={'large'} items={items} />;
};

export const AuthFormWrapper = styled(Flex)`
  width: 100%;
`;
