import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Flex, Form, Input, Spin, Typography } from 'antd';
import { AuthFormWrapper } from '../../../pages/authModalForm/AuthForm';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/authContext';
import styled from 'styled-components';
import Link from 'antd/es/typography/Link';
const { Text } = Typography;


export const LoginForm: React.FC = () => {
  const { login, loginError, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formIsValided, setFormIsValided] = useState<boolean>(false);
  useEffect(() => {
    setFormIsValided(!!email && !!password); // Здесь была ошибка, теперь правильно. upd: Теперь правильно
  }, [email, password]);

  if (isLoading) {
    return (
      <SpinWrapper vertical gap={30} justify="center" align="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} size="large"></Spin>
        <Alert message="Проверяем данные..." description="Пожалуйста, подождите." type="info" />
      </SpinWrapper>
    );
  }

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
        <Form.Item>
          <Link>Забыли пароль?</Link>
        </Form.Item>
      {loginError && (
                <Alert
                  message="Ошибка входа"
                  description="Проверьте имя пользователя и пароль."
                  type="error"
                  showIcon
                />
              )}
      </Form>

      <Button onClick={() => login(email, password)} type="primary" disabled={!formIsValided}>
        {'Войти'}
      </Button>
    </AuthFormWrapper>
  );
};

const SpinWrapper = styled(Flex)`
  height: 260px;
  /* width: 100%; */
  outline: 3px dashed;
  border-radius: 8px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
`;
