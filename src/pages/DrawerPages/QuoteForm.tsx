import React, { useState } from "react";

import { Button, Form, Select } from "antd";
import CustomInput from "../../components/Input/CustomInput";
import isInn from "is-inn-js";
import { customizeRequiredMark } from "../../const/const";

interface QuoteFormProps {
  onSubmit: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [inn, setINN] = useState("");
  const [comments, setComments] = useState("");
  const [volume, setVolume] = useState("");

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
      <Form.Item
        name="annual volume"
        label="Annual volume"
        rules={[{ required: true, message: "Please input annual volume!" }]}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <CustomInput
            placeholder=""
            onChange={() => setVolume}
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
      <Form.Item required={false} name="comments" label="Comments on the order">
        <CustomInput
          placeholder="Write some comments"
          onChange={setComments}
          value={comments}
          name="comments"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuoteForm;
