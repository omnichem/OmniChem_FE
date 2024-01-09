import React, { useState } from "react";

import { Button, Form, InputNumber, Select } from "antd";
import CustomInput from "../../components/Input/CustomInput";
import isInn from "is-inn-js";
import { customizeRequiredMark } from "../../const/const";

const SamplesForm: React.FC = () => {
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
        label="Select your market"
        rules={[{ required: true, message: "Choose a market!" }]}
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
        label="Number ofsamples requested"
        rules={[{ required: true, message: "Input number of samples!" }]}
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
        label="Contact person"
        name="contact person"
        rules={[{ required: true, message: "Please input your contacts!" }]}
      >
        <CustomInput
          placeholder=""
          onChange={setContactPerson}
          value={contactPerson}
          name=""
        />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <CustomInput
          placeholder=""
          onChange={setAddress}
          value={address}
          name=""
        />
      </Form.Item>

      <Form.Item name="phone" label="Number phone" required>
        <CustomInput
          maxLength={12 || 11}
          placeholder="+7/8 (999) 999 99 99"
          onChange={setPhone}
          value={phone}
          name=""
        />
        {(phone[0] === "+" && phone.length === 12 && phone[1] === "7") ||
        (phone[0] === "8" && phone.length === 11) ? (
          <p style={{ color: "#52c41a" }}>Number is valid!</p>
        ) : (
          <p style={{ color: "#ff4d4f" }}>Number is not valid!</p>
        )}
        {phone.length == 0 ? (
          <p style={{ color: "#ff4d4f" }}>
            The number field must contain 11 or 12 characters!
          </p>
        ) : (
          <></>
        )}
      </Form.Item>
      <Form.Item required label="INN" name="inn">
        <CustomInput placeholder="" onChange={setINN} value={inn} name="INN" />
        {isInn(inn) ? (
          <p style={{ color: "#52c41a" }}>INN valid!</p>
        ) : (
          <p style={{ color: "#ff4d4f" }}>INN not valid!</p>
        )}
        {/* 772331755151 */}
        {inn.length == 0 || inn.length < 12 ? (
          <p style={{ color: "#ff4d4f" }}>
            The INN field must contain 12 characters!
          </p>
        ) : (
          <></>
        )}
      </Form.Item>

      <Form.Item required={false} name="comments" label="Comments on the order">
        <CustomInput
          placeholder="Write some comments"
          onChange={setComments}
          value={comments}
          name="comments"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
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
