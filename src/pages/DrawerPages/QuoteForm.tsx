import React, { useState } from "react";

import { Form, Select } from "antd";
import CustomInput from "../../components/Input/CustomInput";
import isInn from "is-inn-js";
import { customizeRequiredMark } from "../../const/const";
import CustomButton from "../../components/CustomButton";

interface QuoteFormProps {
  onQuoteSubmit: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onQuoteSubmit }) => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [inn, setINN] = useState("");
  const [comments, setComments] = useState("");
  const [volume, setVolume] = useState("");

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="8">
        <Select.Option value="8">8</Select.Option>
        <Select.Option value="+7">+7</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form layout="vertical" requiredMark={customizeRequiredMark}>
      <Form.Item
        name="market"
        label="Ваш маркет"
        rules={[{ required: true, message: "Пожалуйста выберите маркет!" }]}
      >
        <Select>
          <Select.Option value="demo">Demo 1</Select.Option>
          <Select.Option value="demo 2">Demo 2</Select.Option>
          <Select.Option value="demo 3">Demo 3</Select.Option>
          <Select.Option value="demo 4">Demo 4</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Адрес"
        name="address"
        rules={[{ required: true, message: "Пожалуйста введите адрес!" }]}
      >
        <CustomInput
          placeholder=""
          onChange={setAddress}
          value={address}
          name=""
        />
      </Form.Item>

      <Form.Item name="phone" label="Номер телефона" required>
        <CustomInput
          addonBefore={prefixSelector}
          maxLength={10}
          placeholder="(999) 999 99 99"
          name="phone"
          onChange={setPhone}
          value={phone}
        />
        {phone.length < 10 ? (
          <p style={{ color: "#ff8800" }}>
            Поле номера телефона должно содержать 10 цифр!
          </p>
        ) : (
          <p style={{ color: "#52c41a" }}>Телефон валиден!</p>
        )}
      </Form.Item>
      <Form.Item required label="ИНН" name="inn">
        <CustomInput
          maxLength={12}
          placeholder=""
          onChange={setINN}
          value={inn}
          name="INN"
        />

        {inn.length == 12 ? (
          isInn(inn) ? (
            <p style={{ color: "#52c41a" }}>ИНН валиден!</p>
          ) : (
            <p style={{ color: "#ff4d4f" }}>ИНН не валиден!</p>
          )
        ) : (
          <p style={{ color: "#ff8800" }}>Поле ИНН должно содержать 12 цифр!</p>
        )}
        {/* 772331755151 */}
      </Form.Item>
      <Form.Item
        name="annual volume"
        label="Годовой объём"
        rules={[
          { required: true, message: "Пожалуйста, укажите годовой объем!" },
        ]}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <CustomInput
            placeholder=""
            onChange={setVolume}
            value={volume}
            name="volume"
          />
          <CustomInput
            disabled={true}
            onChange={() => {}}
            placeholder="Kg"
            value=""
            name="kg"
          />
        </div>
      </Form.Item>
      <Form.Item required={false} name="comments" label="Комментарии к заказу">
        <CustomInput
          placeholder="Напишите несколько пожеланий"
          onChange={setComments}
          value={comments}
          name="comments"
        />
      </Form.Item>
      <Form.Item>
        <CustomButton text="Отправить" type="primary" onClick={onQuoteSubmit} />
      </Form.Item>
    </Form>
  );
};

export default QuoteForm;
