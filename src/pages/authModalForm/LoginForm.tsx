import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { AuthFormWrapper } from './AuthForm';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formIsValided, setFormIsValided] = useState<boolean>(false);

  useEffect(() => {
    setFormIsValided(!!email && !!password); // Здесь была ошибка, теперь правильно. upd: Теперь правильно
  }, [email, password]);

  return (
    <AuthFormWrapper vertical gap={10}>
      <Form layout="vertical">
        <Form.Item
          required={true}
          label="Email"
          name="email"
          tooltip="Введите адрес электронной почты, который вы указывали при регистрации"
          rules={[
            {
              type: 'email',
              message: 'Пожалуйста, введите корректный email',
            },
            {
              required: true,
              message: 'Пожалуйста, введите ваш email',
            },
          ]}
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
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>
      </Form>
      <Button onClick={() => login(email, password)} type="primary" disabled={!formIsValided}>
        Войти
      </Button>
    </AuthFormWrapper>
  );
};
