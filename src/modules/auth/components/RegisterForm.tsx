import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Flex, Form, Input, Spin, Select } from 'antd';
import { useEffect, useState } from 'react';
import { AuthFormWrapper } from '../../../pages/authModalForm/AuthForm';
import { useAuth } from '../../../contexts/authContext';
import { styled } from 'styled-components';
import { ResponseCodeType } from '../../../shared/types/authResponse';

const iconRender = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />);

export const RegisterForm: React.FC = () => {
  const { register, registerError, isLoading, responseCode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    setFormIsValid(!!email && !!password && !!confirmation);
  }, [email, password, confirmation]);

  if (isLoading) {
    return (
      <SpinWrapper vertical gap={30} justify="center" align="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} size="large"></Spin>
        <Alert message="Проверяем данные..." description="Пожалуйста, подождите." type="info" />
      </SpinWrapper>
    );
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    register(email, password);
    setEmail('');
    setPassword('');
    setConfirmation('');
  };

  const inputUserData = (
    <Form onFinish={handleSubmit} autoComplete="off" layout="vertical">
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
        name="confirmation"
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
      <Form.Item>
        <Button onClick={handleSubmit} type="primary" disabled={!formIsValid}>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );

  const errorInfoPage =
  responseCode === ResponseCodeType.BADREQUEST || responseCode === ResponseCodeType.SERVERERROR ? (
    <Flex>
      {registerError &&
        Object.keys(registerError).map(key =>
          registerError[key].map((message, index) => <Alert type="warning" message={message} key={`${key}-${index}`} />)
        )}
    </Flex>
  ) : null;

  const successInfoPage =
    responseCode === ResponseCodeType.SUCCESS ? (
      <Alert
        type="success"
        message={
          <>
            <span>Пользователь успешно зарегистрирован! </span>
            <br />
            <span> На указанный при регистрации email отправлена ссылка. </span>
            <br /> <span>Перейдите по данной ссылке и активируйте ваш аккаунт.</span>
          </>
        }
      />
    ) : null;

  return (
    <AuthFormWrapper vertical gap={10}>
      {inputUserData}
      {successInfoPage}
      {errorInfoPage}
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
