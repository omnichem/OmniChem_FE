import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { AuthFormWrapper } from './AuthForm';
import { useState } from 'react';
import { useAuth } from '../../contexts/authContext';

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(email, password);

  return (
    <AuthFormWrapper vertical gap={10}>
      <Form layout="vertical">
        <Form.Item
          required={true}
          label="Email"
          name="email"
          tooltip="Введите адрес электронной почты, который вы указывали при регистрации"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Login"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          required={true}
          label="Пароль"
          name="password"
          tooltip="Введите пароль, который вы указывали при регистрации"
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>
      </Form>
      <Button onClick={() => login(email, password)} type="primary">
        Войти
      </Button>
    </AuthFormWrapper>
  );
};
