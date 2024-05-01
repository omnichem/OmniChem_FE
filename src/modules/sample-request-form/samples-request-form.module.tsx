import React, { useState } from 'react';
import { Form, InputNumber, Select } from 'antd';
// import isInn from 'is-inn-js';
import { CustomInput, CustomButton } from '../../shared/components';
import { http } from '../../shared/const/http';
import { Market } from '../material-request-form/material-request-form.module';

interface SamplesFormProps {
  markets: Market[];
  productId: number;
}

export const SamplesForm: React.FC<SamplesFormProps> = ({ markets, productId }) => {
  const [market, setMarket] = useState<number>(0);
  const [volume_request, setVolumeRequest] = useState<number>(0);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  // const [inn, setInn] = useState('');
  const [comments, setComments] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [productInfo, setProductInfo] = useState('');

  const selectMarket = (value: number) => {
    setMarket(value);
  };

  const inputVolumeRequest = (value: number) => {
    setVolumeRequest(value);
  };

  const sendSamplesRequest = async () => {
    await http.post(
      '/API/v1/commerce/samplerequest/',
      {
        product: productId,
        volume_request,
        address,
        market,
        comments,
        productInfo,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }
    );
  };

  return (
    <Form layout="vertical">
      <Form.Item
        name="market"
        tooltip="Укажите название вашего магазина или предприятия, где будет осуществляться заказ сырья."
        label="Маркет"
        rules={[{ required: true, message: 'Выберите маркет' }]}
      >
        <Select value={market} onChange={value => selectMarket(value)}>
          {markets.map(market => (
            <Select.Option id={market.id} value={market.id}>
              {market.market_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="number"
        tooltip="Укажите количество образцов компонентов, которые необходимо заказать для анализа или тестирования."
        label="Количество образцов"
        rules={[{ required: true, message: 'Введите количество образцов' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          value={volume_request}
          onChange={value => inputVolumeRequest(value as number)}
        />
      </Form.Item>
      <Form.Item
        label="Контактное лицо"
        tooltip="Укажите имя и контактные данные ответственного лица, с которым можно связаться для уточнения деталей заказа и доставки компонентов."
        name="contact person"
        rules={[{ required: true, message: 'Пожалуйста, введите контактное лицо' }]}
      >
        <CustomInput placeholder="" name="" onChange={setContactPerson} value={contactPerson} />
      </Form.Item>
      <Form.Item
        tooltip="Укажите точный адрес доставки сырья, чтобы мы могли доставить товар в нужное место."
        label="Адрес"
        name="address"
        rules={[{ required: true, message: 'Пожалуйста, введите свой адрес' }]}
      >
        <CustomInput placeholder="" onChange={setAddress} value={address} name="" />
      </Form.Item>

      <Form.Item
        name="phone"
        tooltip="Укажите контактный номер телефона, по которому с вами можно связаться для уточнения деталей заказа."
        label="Номер телефона"
        required
      >
        <CustomInput maxLength={10} placeholder="+7/8 (999) 999 99 99" name="" onChange={setPhone} value={phone} />
        {phone.length < 10 ? (
          <p style={{ color: '#ff8800' }}>Поле номера телефона должно содержать 10 цифр</p>
        ) : (
          <p style={{ color: '#52c41a' }}>Телефон валиден</p>
        )}
      </Form.Item>

      <Form.Item
        required={false}
        tooltip="Дополнительная информация или специфические требования к заказу, которые необходимо учесть при его обработке."
        name="comments"
        label="Комментарии к заказу"
      >
        <CustomInput
          placeholder="Напиши несколько комментариев"
          onChange={setComments}
          value={comments}
          name="comments"
        />
      </Form.Item>

      <Form.Item
        required={false}
        tooltip="Информация об использовании сырья."
        name="product_info"
        label="Информация об использовании сырья."
      >
        <CustomInput
          placeholder="Информация об использовании сырья"
          onChange={setProductInfo}
          value={productInfo}
          name="comments"
        />
      </Form.Item>
      <CustomButton type="primary" text="Отправить" onClick={sendSamplesRequest} />
    </Form>
  );
};
