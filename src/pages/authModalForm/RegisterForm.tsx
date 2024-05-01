import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { AuthFormWrapper } from './AuthForm';
import { useAuth } from '../../contexts/authContext';

const iconRender = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />);

export const RegisterForm: React.FC = () => {
  const { register, registerError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  console.log(email, password);

  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    setFormIsValid(!!email && !!password && !!confirmation);
  }, [email, password, confirmation]);

  return (
    <AuthFormWrapper vertical gap={10}>
      <Form autoComplete="off" layout="vertical">
        <Form.Item
          required={true}
          name="email"
          label="Email"
          tooltip="Введите адрес электронной почты, по которому вы хотите зарегистрироваться"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Вы ввели некорректный email',
            },
          ]}
          hasFeedback
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
              validator: (_, value) => {
                if (value.length < 8) {
                  return Promise.reject('Пароль должен содержать не менее 8 символов');
                }
                if (/[a-z]/.test(value) === false || /[A-Z]/.test(value) === false) {
                  return Promise.reject('Пароль должен содержать хотя бы одну букву в нижнем и верхнем регистре');
                }
                if (!/[0-9]/.test(value)) {
                  return Promise.reject('Пароль должен содержать хотя бы одну цифру');
                }
                return Promise.resolve();
              },
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            iconRender={iconRender}
          />
        </Form.Item>
        <Form.Item
          label="Подтвердите пароль"
          name="confirm"
          dependencies={['password']}
          tooltip="Введите пароль повторно"
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Не совпадает'));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmation}
            onChange={e => setConfirmation(e.target.value)}
          />
        </Form.Item>
      </Form>

      {registerError?.map(error => {
        return <p>{error}</p>;
      })}

      <Button onClick={() => register(email, password)} type="primary" disabled={!formIsValid}>
        Зарегистрироваться
      </Button>
    </AuthFormWrapper>
  );
};
