import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { AuthFormWrapper } from './AuthForm';
import { registerUser } from '../../functions/registerUser';

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(email, password);

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
      <Button onClick={() => registerUser(email, password)} type="primary">
        Зарегистрироваться
      </Button>
    </AuthFormWrapper>
  );
};
