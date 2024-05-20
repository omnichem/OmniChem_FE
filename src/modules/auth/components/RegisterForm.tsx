import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Flex, Form, Input, Spin, Switch, Typography, Select } from 'antd';
import { useEffect, useState } from 'react';
import { AuthFormWrapper } from '../../../pages/authModalForm/AuthForm';
import { useAuth } from '../../../contexts/authContext';
import { styled } from 'styled-components';
import { CustomButton } from '../../../shared/components';
const { Text } = Typography;

const iconRender = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />);

enum RegisterRole {
  BUYER,
  SUPPLIER,
}

enum Page {
  Password,
  Employee,
}

export const RegisterForm: React.FC = () => {
  const { register, registerError, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [registerAs, setRegisterAs] = useState<RegisterRole>(RegisterRole.SUPPLIER);
  const [registerForm, setRegisterForm] = useState<Page>(Page.Password);

  console.log(email, password, confirmation);

  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    setFormIsValid(!!email && !!password && !!confirmation && !!first_name && !!last_name && !!position && !!phone);
  }, [email, password, first_name, last_name, position, phone]);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="8">
        <Select.Option value="8">8</Select.Option>
        <Select.Option value="+7">+7</Select.Option>
      </Select>
    </Form.Item>
  );

  if (isLoading) {
    return (
      <SpinWrapper vertical gap={30} justify="center" align="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} size="large"></Spin>
        <Alert message="Проверяем данные..." description="Пожалуйста, подождите." type="info" />
      </SpinWrapper>
    );
  }
  const checkRegPrevPage = () => {
    if (registerForm === Page.Employee) {
      setRegisterForm(Page.Password);
    }
  };

  const checkRegNextPage = () => {
    if (registerForm === Page.Password) {
      setRegisterForm(Page.Employee);
    }
  };

  const changeRole = (checked: boolean) => {
    if (checked) {
      setRegisterAs(RegisterRole.BUYER);
    } else {
      setRegisterAs(RegisterRole.SUPPLIER);
    }
  };

  const ConditionalNextButton = () => {
    if (registerForm !== Page.Employee) {
      return <CustomButton text="Далее" type="primary" onClick={checkRegNextPage} />;
    }
    return null;
  };

  const ConditionalBackButton = () => {
    if (registerForm !== Page.Password) {
      return <CustomButton text="Назад" type="primary" onClick={checkRegPrevPage} />;
    }
    return null;
  };

  const registerFormContent =
    registerForm == Page.Password ? (
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
          <Flex gap={20} justify="center">
            <Text>Поставщик</Text>
            <Switch onChange={changeRole} />
            <Text>Покупатель</Text>
          </Flex>
        </Form.Item>
      </Form>
    ) : (
      <Form autoComplete="off" layout="vertical">
        <Form.Item
          label="Фамилия"
          name="last_name"
          tooltip="Фамилия сотрудника компании"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Введите вашу фамилию"
            value={last_name}
            onChange={e => setLast_name(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Имя"
          name="first_name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Введите ваше имя"
            value={first_name}
            onChange={e => setFirst_name(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Должность"
          name="position"
          tooltip="Занимаемая вами в компании позиция"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Укажите вашу должность"
            value={position}
            onChange={e => setPosition(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="phone" label="Номер телефона" tooltip="Укажите контактный номер телефона для связи." required>
          <Input
            addonBefore={prefixSelector}
            maxLength={10}
            placeholder="(999) 999 99 99"
            name="phone"
            onChange={e => setPhone(e.target.value)}
            value={phone}
          />
          {phone.length < 10 ? (
            <p style={{ color: '#ff8800' }}>Поле номера телефона должно содержать 10 цифр</p>
          ) : (
            <p style={{ color: '#52c41a' }}>Телефон валиден</p>
          )}
        </Form.Item>
      </Form>
    );

  return (
    <AuthFormWrapper vertical gap={10}>
      {registerError?.map(error => {
        return <Alert type="warning" message={error} />;
      })}
      {registerFormContent}
      <Button
        onClick={() => register(email, password, phone, first_name, last_name, position)}
        type="primary"
        disabled={!formIsValid}
      >
        {registerAs == RegisterRole.BUYER ? 'Зарегистрироваться как покупатель' : 'Зарегистрироваться как поставщик'}
      </Button>
      <ConditionalNextButton />
      <ConditionalBackButton />
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
