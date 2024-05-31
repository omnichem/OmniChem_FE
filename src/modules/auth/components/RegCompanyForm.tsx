import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Flex, Form, Input, Spin, Select } from 'antd';
import { useEffect, useState } from 'react';
import { AuthFormWrapper } from '../../../pages/authModalForm/AuthForm';
import { useAuth } from '../../../contexts/authContext';
import { styled } from 'styled-components';

const orgStructure = [
  { structure: 'ООО' },
  { structure: 'ОАО' },
  { structure: 'ЗАО' },
  { structure: 'ПАО' },
  { structure: 'ИП' },
];

const market = [
  { market_name: 'Промышленный' },
  { market_name: 'Автомобилестроение и транспорт' },
  { market_name: 'Потребительские товары' },
  { market_name: 'Здание и стройка' },
  { market_name: 'Еда и полноценное питание' },
  { market_name: 'Электротехника и электроника' },
  { market_name: 'Краски и покрытия' },
  { market_name: 'Печать и упаковка' },
  { market_name: 'Личная гигиена' },
  { market_name: 'Клеи и герметики' },
  { market_name: 'Бытовая химия' },
  { market_name: 'Здравоохранение и фармацевтика' },
  { market_name: 'Сельское хозяйство и корма' },
];

export const RegCompanyForm: React.FC = () => {
  const { register, registerError, isLoading } = useAuth();
  const [inn, setInn] = useState('');
  const [company_type, setСompany_type] = useState('ooo');
  const [company_name, setСompany_name] = useState('');
  const [markets, setMarkets] = useState('Промышленный');
  const [address, setAddress] = useState('');
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const INN_REGEX = /^(\d{10}|\d{12})$/;

  useEffect(() => {
    setFormIsValid(!!inn && !!company_type && !!company_name && !!markets && !!address);
  }, [inn, company_type, company_name, markets, address]);

  if (isLoading) {
    return (
      <SpinWrapper vertical gap={30} justify="center" align="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} size="large"></Spin>
        <Alert message="Проверяем данные..." description="Пожалуйста, подождите." type="info" />
      </SpinWrapper>
    );
  }

  const regFormContent = (
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
          value={company_name}
          onChange={e => setСompany_name(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Организационная форма" name="organizationForm" required={true} hasFeedback>
        <Select
          className="companyNameInput"
          placeholder="Например ООО"
          value={company_type}
          onChange={value => setСompany_type(value)}
        >
          {orgStructure.map(item => (
            <Select.Option value={item.structure} key={item.structure}>
              {item.structure}
            </Select.Option>
          ))}
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
        <Select value={markets} onChange={value => setMarkets(value)}>
          {markets.map(marketItem => (
            <Select.Option value={marketItem.market_name} key={marketItem.market_name}>
              {marketItem.market_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Юр. адрес"
        name="address"
        required={true}
        tooltip="Юридический адрес по которому зарегистрировано юридическое лицо"
        hasFeedback
      >
        <Input
          className="companyNameInput"
          placeholder="Введите юридический адрес компании"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
      </Form.Item>
    </Form>
  );

  return (
    <AuthFormWrapper vertical gap={10}>
      {registerError?.map(error => {
        return <Alert type="warning" message={error} key={error} />;
      })}
      {regFormContent}
      <Button
        onClick={() => register(inn, company_type, company_name, market, address)}
        type="primary"
        disabled={!formIsValid}
      ></Button>
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
