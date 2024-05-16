import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Flex, Form, Input, Spin, Switch, Typography, Select } from 'antd';
import { useEffect, useState } from 'react';
import { AuthFormWrapper } from '../../../pages/authModalForm/AuthForm';
import { useAuth } from '../../../contexts/authContext';
import { styled } from 'styled-components';
import { CustomButton } from '../../../shared/components';
const { Text } = Typography;
const { TextArea } = Input;

const iconRender = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />);

enum RegisterRole {
  BUYER,
  SUPPLIER,
}

enum Page {
  Password,
  Employee,
  Company,
}

export const RegisterForm: React.FC = () => {
  const { register, registerError, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [inn, setInn] = useState('');
  const [organization_structure, setOrganization_structure] = useState('ooo');
  const [company_name_shortened, setCompany_name_shortened] = useState('');
  const [about, setAbout] = useState('');
  const INN_REGEX = /^(\d{10}|\d{12})$/;
  const [phone, setPhone] = useState('');
  const [marketName, setMarketName] = useState('Промышленный');
  const [registerAs, setRegisterAs] = useState<RegisterRole>(RegisterRole.SUPPLIER);
  const [registerForm, setRegisterForm] = useState<Page>(Page.Password);

  console.log(email, password);

  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    setFormIsValid(
      !!email &&
        !!password &&
        !!confirmation &&
        !!firstName &&
        !!lastName &&
        !!position &&
        !!phone &&
        !!company_name_shortened &&
        !!inn &&
        !!marketName
    );
  }, [email, password, confirmation, firstName, lastName, position, phone, company_name_shortened, inn, marketName]);

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
    if (registerForm === Page.Company) {
      setRegisterForm(Page.Employee);
    } else {
      setRegisterForm(Page.Password);
    }
  };

  const checkRegNextPage = () => {
    if (registerForm === Page.Password) {
      setRegisterForm(Page.Employee);
    } else {
      setRegisterForm(Page.Company);
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
    if (registerForm !== Page.Company) {
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

  // const ConditionalRegButton = () => {
  //   if (registerForm === Page.Company) {
  //     <Button onClick={() => register(email, password)} type="primary" disabled={!formIsValid}>
  //       {registerAs == RegisterRole.BUYER ? 'Зарегистрироваться как покупатель' : 'Зарегистрироваться как поставщик'}
  //     </Button>;
  //   }
  //   return null;
  // };

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
        <Form.Item>
          <Flex gap={20} justify="center">
            <Text>Поставщик</Text>
            <Switch onChange={changeRole} />
            <Text>Покупатель</Text>
          </Flex>
        </Form.Item>
      </Form>
    ) : registerForm == Page.Employee ? (
      <Form autoComplete="off" layout="vertical">
        <Form.Item
          label="Фамилия"
          name="lastName"
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
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Имя"
          name="firstName"
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
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
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
    ) : registerForm == Page.Company ? (
      <Form className="supplierDetailForm" layout="vertical">
        <Form.Item
          label="Краткое наименование"
          name="companyName"
          required={true}
          tooltip="Введите юридическое наименование вашей компании"
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            className="companyNameInput"
            placeholder="Введите краткое наименование компании"
            value={company_name_shortened}
            onChange={e => setCompany_name_shortened(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label="Организационная форма" name="organizationForm" required={true} hasFeedback>
          <Select
            className="companyNameInput"
            placeholder="Например ООО"
            value={organization_structure}
            onChange={value => setOrganization_structure(value)}
          >
            <Select.Option value="ooo">ООО</Select.Option>
            <Select.Option value="oao">ОАО</Select.Option>
            <Select.Option value="zao">ЗАО</Select.Option>
            <Select.Option value="pao">ПАО</Select.Option>
            <Select.Option value="ip">ИП</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="ИНН"
          name="INN"
          tooltip="ИНН содержит 10 или 12 цифр в зависимости от организационной формы ЮЛ"
          required={true}
          rules={[
            {
              validator: (_, value) => {
                if (!INN_REGEX.test(value)) {
                  return Promise.reject('ИНН должен содержать 10 или 12 символов');
                }
                return Promise.resolve();
              },
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            className="detailsInput"
            maxLength={12}
            placeholder="Укажите ИНН вашей компании"
            type="number"
            pattern="[0-9]*"
            title="Пожалуйста, введите только цифры"
            value={inn}
            onChange={e => setInn(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="market"
          tooltip="Укажите область рынка, в котором работает ваша компания."
          label="Маркет"
          required={true}
        >
          <Select value={marketName} onChange={value => setMarketName(value)}>
            <Select.Option value="Industrial">Промышленный</Select.Option>
            <Select.Option value="auto">Автомобилестроение и транспорт</Select.Option>
            <Select.Option value="goods">Потребительские товары</Select.Option>
            <Select.Option value="build">Здание и стройка</Select.Option>
            <Select.Option value="food">Еда и полноценное питание</Select.Option>
            <Select.Option value="electricity">Электротехника и электроника</Select.Option>
            <Select.Option value="paint">Краски и покрытия</Select.Option>
            <Select.Option value="print">Печать и упаковка</Select.Option>
            <Select.Option value="care">Личная гигиена</Select.Option>
            <Select.Option value="adhesives">Клеи и герметики</Select.Option>
            <Select.Option value="household">Бытовая химия</Select.Option>
            <Select.Option value="pharma">Здравоохранение и фармацевтика</Select.Option>
            <Select.Option value="agriculture">Сельское хозяйство и корма</Select.Option>
            {/* {markets.map(market => (
              <Select.Option id={market.id} value={market.id}>
                {market.market_name}
              </Select.Option>
            ))} */}
          </Select>
        </Form.Item>
        <Form.Item label="Описание компании" name="companyDescription">
          <TextArea
            className="detailsInput"
            style={{ maxHeight: '60px' }}
            rows={6}
            maxLength={200}
            placeholder="Введите описание компании, которое увидят клиенты"
            value={about}
            onChange={e => setAbout(e.target.value)}
          />
        </Form.Item>
      </Form>
    ) : null;

  return (
    <AuthFormWrapper vertical gap={10}>
      {registerError?.map(error => {
        return <Alert type="warning" message={error} />;
      })}
      {registerFormContent}
      <Button onClick={() => register(email, password)} type="primary" disabled={!formIsValid}>
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
