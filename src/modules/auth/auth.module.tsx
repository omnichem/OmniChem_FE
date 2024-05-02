import React, { useState } from 'react';

import { Flex, Tabs } from 'antd';
import styled from 'styled-components';

import { useAuth } from '../../contexts/authContext';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { useNavigate } from 'react-router';

export const Auth: React.FC = () => {
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();
  if (isAuthorized) {
    navigate('/');
  }

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
  return <Tabs defaultActiveKey="register" type="card" size={'large'} items={items} />;
};

export const AuthFormWrapper = styled(Flex)`
  width: 100%;
`;
