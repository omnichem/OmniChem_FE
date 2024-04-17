import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { AuthFormWrapper } from './AuthForm';
import { useAuth } from '../../contexts/authContext';

const iconRender = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />);

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  console.log(email, password);

  return (
    <AuthFormWrapper vertical gap={10}>
      <Form layout="vertical">
        <Form.Item
          required={true}
          name="email"
          label="Email"
          tooltip="Введите адрес электронной почты, по которому вы хотите зарегистрироваться"
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
          tooltip="Введите пароль, который будет использоваться при в ходе в учетную запись"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ваш пароль. Длина пароля должна быть не менее 8 символов',
              min: 8,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            iconRender={iconRender}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ваш пароль. Длина пароля должна быть не меенее 8 символов',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Подтверждение пароля"
            value={confirmation}
            onChange={e => setConfirmation(e.target.value)}
            minLength={10}
          />
        </Form.Item>
      </Form>

      <Button onClick={() => register(email, password)} type="primary">
        Зарегистрироваться
      </Button>
    </AuthFormWrapper>
  );
};
