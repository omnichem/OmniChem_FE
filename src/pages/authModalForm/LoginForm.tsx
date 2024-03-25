import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { AuthFormWrapper } from './AuthForm';
import { useState } from 'react';
import { http } from '../../const/http';

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(email, password);

  // /API/v1/commerce/auth/token/login/
  const userLogin = async () => {
    // /API/v1/commerce/auth/users/
    await http
      .post('/API/v1/commerce/auth/token/login/', {
        email: email,
        password: password,
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
      <Button onClick={userLogin} type="primary">
        Войти
      </Button>
    </AuthFormWrapper>
    // <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login поставщика" />

    // <Input
    //   prefix={<LockOutlined className="site-form-item-icon" />}
    //   type="password"
    //   placeholder="Пароль поставщика"
    // />

    // <Button onSubmit={submitsupplierLogin} type="primary" htmlType="submit" className="login-form-button">
    //   Зарегистрироваться
    // </Button>
    // Уже зарегистрированы?
    // <Button onClick={loginButton}>Войти сейчас!</Button>
  );
};
