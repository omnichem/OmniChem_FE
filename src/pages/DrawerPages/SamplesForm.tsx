import React, { useState } from "react";

import { Form, InputNumber, Select } from "antd";
import CustomInput from "../../components/Input/CustomInput";
import isInn from "is-inn-js";
import { customizeRequiredMark } from "../../const/const";
import CustomButton from "../../components/CustomButton";

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
    <Form form={form} layout="vertical" requiredMark={customizeRequiredMark}>
      <Form.Item
        name="market"
        label="Маркет"
        rules={[{ required: true, message: "Выберите маркет!" }]}
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
        label="Количество образцов"
        rules={[{ required: true, message: "Введите количество образцов!" }]}
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
        name="contact person"
        rules={[
          { required: true, message: "Пожалуйста, введите контактное лицо!" },
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
        label="Адрес"
        name="address"
        rules={[{ required: true, message: "Пожалуйста, введите свой адрес!" }]}
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
          maxLength={10}
          placeholder="+7/8 (999) 999 99 99"
          onChange={setPhone}
          value={phone}
          name=""
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
      </Form.Item>

      <Form.Item required={false} name="comments" label="Комментарии к заказу">
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

// const SamplesForm: React.FC<SamplesFormProps> = ({ onSubmit }) => {
//   const [numOfSamples, setNumOfSamples] = useState("");
//   const [market, setMarket] = useState("");
//   const [requestComments, setRequestComments] = useState("");
//   const [contactPerson, setContactPerson] = useState("");
//   const [deliveryAddress, setDeliveryAddress] = useState("");

//   const [phoneNumber, setPhoneNumber] = useState("");

//   const [commentsOnDelivery, setCommentsOnDelivery] = useState("");
//   const [individualTaxpayerNumber, setIndividualTaxpayerNumber] = useState("");

//   return (
//     <DrowerFormWrapper>
//       <FormsContainer>
//         <h2>Request details</h2>
//         <p>Number of samples requested</p>
//         <InputFormWrapper>
//           <CustomInput
//             styleType={InputStyle.DEFAULT}
//             placeholder=""
//             onChange={setNumOfSamples}
//             value={numOfSamples}
//           />
//         </InputFormWrapper>
//         <p>Input your market</p>
//         <InputFormWrapper>
//           <CustomInput
//             styleType={InputStyle.DEFAULT}
//             placeholder=""
//             onChange={setMarket}
//             value={market}
//           />
//         </InputFormWrapper>
//         <p>Request comments</p>
//         <InputFormWrapper>
//           <CustomInput
//             styleType={InputStyle.DEFAULT}
//             placeholder=""
//             onChange={setRequestComments}
//             value={requestComments}
//           />
//         </InputFormWrapper>
//         <h2>Delivery info</h2>
//         <p>Input contact person</p>
//         <InputFormWrapper>
//           <CustomInput
//             styleType={InputStyle.DEFAULT}
//             placeholder=""
//             onChange={setContactPerson}
//             value={contactPerson}
//           />
//         </InputFormWrapper>
//         <p>Delivery address</p>
//         <InputFormWrapper>
//           <CustomInput
//             styleType={InputStyle.DEFAULT}
//             placeholder=""
//             onChange={setDeliveryAddress}
//             value={deliveryAddress}
//           />
//         </InputFormWrapper>
//         <p>Input phone number</p>
//         <InputFormWrapper>
//           <CustomInput
//             value={phoneNumber}
//             onChange={setPhoneNumber}
//             placeholder="+7/8 (999) 999 99 99"
//             styleType={InputStyle.DEFAULT}
//             maxLength={12 || 11}
//           />
//           {(phoneNumber[0] === "+" &&
//             phoneNumber.length === 12 &&
//             phoneNumber[1] === "7") ||
//           (phoneNumber[0] === "8" && phoneNumber.length === 11) ? (
//             <p>Number is valid</p>
//           ) : (
//             <p>Number is not valid</p>
//           )}
//         </InputFormWrapper>

//         <p>Comments on delivery</p>
//         <InputFormWrapper>
//           <CustomInput
//             styleType={InputStyle.DEFAULT}
//             placeholder=""
//             onChange={setCommentsOnDelivery}
//             value={commentsOnDelivery}
//           />
//         </InputFormWrapper>
//         <p>Input individual taxpayer number</p>
//         <InputFormWrapper>
//           <CustomInput
//             styleType={InputStyle.DEFAULT}
//             placeholder=""
//             onChange={setIndividualTaxpayerNumber}
//             value={individualTaxpayerNumber}
//           />
//           {isInn(individualTaxpayerNumber) ? (
//             <p>INN valid</p>
//           ) : (
//             <p>INN not valid</p>
//           )}
//         </InputFormWrapper>
//       </FormsContainer>

//       <Button
//         type="default"
//         disabled={!isInn(individualTaxpayerNumber)}
//         text="Submit"
//         onClick={onSubmit}
//       />
//     </DrowerFormWrapper>
//   );
// };

// const FormsContainer = styled.div``;

// export default SamplesForm;
