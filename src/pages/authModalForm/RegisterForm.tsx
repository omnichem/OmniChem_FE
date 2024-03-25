import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Input } from 'antd';
import { useState } from 'react';
import { styled } from 'styled-components';
import { http } from '../../const/http';
import { AuthFormWrapper } from './AuthForm';

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(email, password);

  const userRegister = async () => {
    // /API/v1/commerce/auth/users/
    await http
      .post('/API/v1/commerce/auth/users/', {
        password: password,
        email: email,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <AuthFormWrapper vertical gap={10}>
      <Input
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Login"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={userRegister} type="primary">
        Зарегистрироваться
      </Button>
    </AuthFormWrapper>
  );
};
