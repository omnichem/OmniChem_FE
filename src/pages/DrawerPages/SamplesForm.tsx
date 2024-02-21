import React, { useState } from "react";
import { Form, InputNumber, Select } from "antd";
import isInn from "is-inn-js";
import { customizeRequiredMark } from "../../const/const";
import { CustomButton, CustomInput } from "../../components";

interface SamplesFormProps {
  onSamplesSubmit: () => void;
}

const SamplesForm: React.FC<SamplesFormProps> = ({ onSamplesSubmit }) => {
  const [form] = Form.useForm();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [inn, setINN] = useState("");
  const [comments, setComments] = useState("");
  const [contactPerson, setContactPerson] = useState("");

  const onChangeSamples = (value: number) => {
    console.log("changed", value);
  };

  return (
    <Form form={form} layout="vertical" >
      <Form.Item
        name="market"
        tooltip="Укажите название вашего магазина или предприятия, где будет осуществляться заказ сырья."
        label="Маркет"
        rules={[{ required: true, message: "Выберите маркет" }]}
      >
        <Select>
          <Select.Option value="demo">Demo 1</Select.Option>
          <Select.Option value="demo">Demo 2</Select.Option>
          <Select.Option value="demo">Demo 3</Select.Option>
          <Select.Option value="demo">Demo 4</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="number"
        tooltip="Укажите количество образцов компонентов, которые необходимо заказать для анализа или тестирования."
        label="Количество образцов"
        rules={[{ required: true, message: "Введите количество образцов" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={1}
          max={100}
          defaultValue={1}
          onChange={() => onChangeSamples}
        />
      </Form.Item>
      <Form.Item
        label="Контактное лицо"
        tooltip="Укажите имя и контактные данные ответственного лица, с которым можно связаться для уточнения деталей заказа и доставки компонентов."
        name="contact person"
        rules={[
          { required: true, message: "Пожалуйста, введите контактное лицо" },
        ]}
      >
        <CustomInput
          placeholder=""
          onChange={setContactPerson}
          value={contactPerson}
          name=""
        />
      </Form.Item>
      <Form.Item
        tooltip="Укажите точный адрес доставки сырья, чтобы мы могли доставить товар в нужное место."
        label="Адрес"
        name="address"
        rules={[{ required: true, message: "Пожалуйста, введите свой адрес" }]}
      >
        <CustomInput
          placeholder=""
          onChange={setAddress}
          value={address}
          name=""
        />
      </Form.Item>

      <Form.Item name="phone" tooltip="Укажите контактный номер телефона, по которому с вами можно связаться для уточнения деталей заказа." label="Номер телефона" required>
        <CustomInput
          maxLength={10}
          placeholder="+7/8 (999) 999 99 99"
          onChange={setPhone}
          value={phone}
          name=""
        />
        {phone.length < 10 ? (
          <p style={{ color: "#ff8800" }}>
            Поле номера телефона должно содержать 10 цифр
          </p>
        ) : (
          <p style={{ color: "#52c41a" }}>Телефон валиден</p>
        )}
      </Form.Item>
      <Form.Item required tooltip="Укажите ваш ИНН для оформления документов и соблюдения налоговых требований." label="ИНН" name="inn">
        <CustomInput
          maxLength={12}
          placeholder=""
          onChange={setINN}
          value={inn}
          name="INN"
        />
        {inn.length == 12 ? (
          isInn(inn) ? (
            <p style={{ color: "#52c41a" }}>ИНН валиден</p>
          ) : (
            <p style={{ color: "#ff4d4f" }}>ИНН не валиден</p>
          )
        ) : (
          <p style={{ color: "#ff8800" }}>Поле ИНН должно содержать 12 цифр</p>
        )}
      </Form.Item>

      <Form.Item required={false} tooltip="Дополнительная информация или специфические требования к заказу, которые необходимо учесть при его обработке." name="comments" label="Комментарии к заказу">
        <CustomInput
          placeholder="Напиши несколько комментариев"
          onChange={setComments}
          value={comments}
          name="comments"
        />
      </Form.Item>
      <Form.Item>
        <CustomButton
          type="primary"
          text="Отправить"
          onClick={onSamplesSubmit}
        />
      </Form.Item>
    </Form>
  );
};

export default SamplesForm;
