import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Flex, Form, Input, Spin, Select } from 'antd';
import { useEffect, useState } from 'react';
import { AuthFormWrapper } from '../../../pages/authModalForm/AuthForm';
import styled from 'styled-components';
import { useCompany } from '../../../contexts/companyContext';

const orgStructure = [
  { structure: 'ООО' },
  { structure: 'ОАО' },
  { structure: 'ЗАО' },
  { structure: 'ПАО' },
  { structure: 'ИП' },
];


export const RegCompanyForm: React.FC = () => {
  const { registerCompany, registerError, isLoading } = useCompany();
  const [inn, setInn] = useState('');
  const [companyType, setCompanyType] = useState('ООО');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const INN_REGEX = /^(\d{10}|\d{12})$/;

  useEffect(() => {
    setFormIsValid(!!inn && !!companyType && !!companyName && !!address);
  }, [inn, companyType, companyName, address]);

  const handleSubmit = async () => {
    if (formIsValid) {
      await registerCompany({ inn, companyType, companyName, address });
    }
  };

  if (isLoading) {
    return (
      <SpinWrapper vertical gap={30} justify="center" align="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} size="large" />
        <Alert message="Проверяем данные..." description="Пожалуйста, подождите." type="info" />
      </SpinWrapper>
    );
  }

  return (
    <AuthFormWrapper vertical gap={10}>
      {registerError && Object.keys(registerError).map((key) => (
        <Alert type="warning" message={registerError[key].join(', ')} key={key} />
      ))}
      <Form className="supplierDetailForm" layout="vertical" onFinish={handleSubmit}>
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
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label="Организационная форма" name="organizationForm" required={true} hasFeedback>
          <Select
            className="companyNameInput"
            placeholder="Например ООО"
            value={companyType}
            onChange={(value) => setCompanyType(value)}
          >
            {orgStructure.map((item) => (
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
            type="text"
            pattern="[0-9]*"
            title="Пожалуйста, введите только цифры"
            value={inn}
            onChange={(e) => setInn(e.target.value)}
          />
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
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!formIsValid}>
            Зарегистрировать
          </Button>
        </Form.Item>
      </Form>
    </AuthFormWrapper>
  );
};

const SpinWrapper = styled(Flex)`
  height: 260px;
  outline: 3px dashed;
  border-radius: 8px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
`;
