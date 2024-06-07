import './companyCardForm.css';
import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { http } from '../../../../shared/const/http';

const { TextArea } = Input;

const CompanyCardForm: React.FC = () => {
  const sendData = async () => {
    await http.post(
      '/API/v1/commerce/distributors/',
      {
        inn: inn,
        organization_structure: organization_structure,
        company_name_shortened: company_name_shortened,
        about: about,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }
    );
  };

  const [inn, setInn] = useState('');
  const [organization_structure, setOrganization_structure] = useState('ooo');
  const [company_name_shortened, setCompany_name_shortened] = useState('');
  const [about, setAbout] = useState('');
  const INN_REGEX = /^(\d{10}|\d{12})$/;
  const [marketName, setMarketName] = useState('Промышленный');

  return (
    <div className="supplierAccountForm-wrapper">
      <Form className="supplierDetailForm" layout="vertical">
        <div className="nameCompany-wrapper">
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
        </div>
        <Form.Item
          label="ИНН"
          name="INN"
          tooltip="ИНН содержит 12 цифр"
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
            required
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
        <Button type="primary" onClick={sendData} style={{ width: '100%', maxWidth: '100px' }}>
          Сохранить
        </Button>
      </Form>
    </div>
  );
};

export default CompanyCardForm;
