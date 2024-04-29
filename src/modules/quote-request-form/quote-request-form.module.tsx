import React, { useState } from 'react';
import { Form, Select } from 'antd';
import isInn from 'is-inn-js';
import { CustomButton, CustomInput } from '../../shared/components';
import { Market } from '../../modules/material-request-form/material-request-form.module';

interface QuoteFormProps {
  markets: Market[];
  productId: number;
  productName: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ markets, productId, productName }) => {
  const [marketName, setMarketName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [inn, setINN] = useState('');
  const [comments, setComments] = useState('');
  const [volume, setVolume] = useState('');

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="8">
        <Select.Option value="8">8</Select.Option>
        <Select.Option value="+7">+7</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form layout="vertical">
      <Form.Item
        name="market"
        label="Ваш маркет"
        tooltip="Укажите название вашего магазина или предприятия, где будет осуществляться заказ сырья."
        rules={[{ required: true, message: 'Пожалуйста выберите маркет' }]}
      >
        <Select value={marketName} onChange={value => setMarketName(value)}>
          {markets.map(market => (
            <Select.Option id={market.id} value={market.id}>
              {market.market_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        tooltip="Укажите точный адрес доставки сырья, чтобы поставщик смог доставить товар в нужное место."
        label="Адрес"
        name="address"
        rules={[{ required: true, message: 'Пожалуйста введите адрес' }]}
      >
        <CustomInput placeholder="" onChange={setAddress} value={address} name="" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Номер телефона"
        tooltip="Укажите контактный номер телефона, по которому с вами можно связаться для уточнения деталей заказа."
        required
      >
        <CustomInput
          addonBefore={prefixSelector}
          maxLength={10}
          placeholder="(999) 999 99 99"
          name="phone"
          onChange={setPhone}
          value={phone}
        />
        {phone.length < 10 ? (
          <p style={{ color: '#ff8800' }}>Поле номера телефона должно содержать 10 цифр</p>
        ) : (
          <p style={{ color: '#52c41a' }}>Телефон валиден</p>
        )}
      </Form.Item>
      <Form.Item
        required
        label="ИНН"
        tooltip="Укажите ваш ИНН для оформления документов и соблюдения налоговых требований."
        name="inn"
      >
        <CustomInput maxLength={12} placeholder="" onChange={setINN} value={inn} name="INN" />

        {inn.length == 12 ? (
          isInn(inn) ? (
            <p style={{ color: '#52c41a' }}>ИНН валиден</p>
          ) : (
            <p style={{ color: '#ff4d4f' }}>ИНН не валиден</p>
          )
        ) : (
          <p style={{ color: '#ff8800' }}>Поле ИНН должно содержать 12 цифр</p>
        )}
        {/* 772331755151 */}
      </Form.Item>
      <Form.Item
        name="annual volume"
        tooltip="Укажите примерный годовой объем сырья, который вы планируете заказывать у нас."
        label="Годовой объём"
        rules={[{ required: true, message: 'Пожалуйста, укажите годовой объем' }]}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <CustomInput placeholder="" onChange={setVolume} value={volume} name="volume" />
          <CustomInput disabled={true} onChange={() => {}} placeholder="Kg" value="" name="kg" />
        </div>
      </Form.Item>
      <Form.Item
        required={false}
        tooltip="Дополнительная информация или специфические требования к заказу, которые необходимо учесть при его обработке."
        name="comments"
        label="Комментарии к заказу"
      >
        <CustomInput
          placeholder="Напишите несколько пожеланий"
          onChange={setComments}
          value={comments}
          name="comments"
        />
      </Form.Item>
      <Form.Item>
        <CustomButton text="Отправить" type="primary" onClick={() => {}} />
      </Form.Item>
    </Form>
  );
};
