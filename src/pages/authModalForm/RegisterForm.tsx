import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { AuthFormWrapper } from './AuthForm';
import { useAuth } from '../../contexts/authContext';

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const { register } = useAuth();
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
          tooltip="Введите адрес электронной почты, по которому вы хотите зарегистрироваться"
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
          tooltip="Введите пароль, который будет использоваться при в ходе в учетную запись"
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

      <Button onClick={() => register(email, password)} type="primary">
        Зарегистрироваться
      </Button>
    </AuthFormWrapper>
  );
};
