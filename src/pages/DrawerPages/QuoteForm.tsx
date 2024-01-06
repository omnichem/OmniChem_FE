import React, { useState } from "react";
import { InputStyle, ButtonStyle } from "../../type";
import { DrowerFormWrapper, InputFormWrapper } from "./Components";

import Button from "../../components/Button";

import Input from "../../components/Input/Input";
import styled from "styled-components";
import isInn from "is-inn-js";

interface QuoteFormProps {
  onSubmit: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit }) => {
  const [market, setMarket] = useState("");

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [commentsOnDelivery, setCommentsOnDelivery] = useState("");
  const [individualTaxpayerNumber, setIndividualTaxpayerNumber] = useState("");
  const [annualVolume, setAnnualVolume] = useState("");

  return (
    <DrowerFormWrapper>
      <FormsContainer>
        <h2>Request details</h2>
        <p>Input your market</p>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder=""
            onChange={setMarket}
            value={market}
          />
        </InputFormWrapper>

        <p>Delivery address</p>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder=""
            onChange={setDeliveryAddress}
            value={deliveryAddress}
          />
        </InputFormWrapper>
        <p>Input phone number</p>
        <InputFormWrapper>
          <Input
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="+7/8 (999) 999 99 99"
            styleType={InputStyle.BORDERED}
            maxLength={12 || 11}
          />
          {(phoneNumber[0] === "+" &&
            phoneNumber.length === 12 &&
            phoneNumber[1] === "7") ||
          (phoneNumber[0] === "8" && phoneNumber.length === 11) ? (
            <p>Number is valid</p>
          ) : (
            <p>Number is not valid</p>
          )}
        </InputFormWrapper>

        <p>Input individual taxpayer number</p>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder=""
            onChange={setIndividualTaxpayerNumber}
            value={individualTaxpayerNumber}
          />
          {isInn(individualTaxpayerNumber) ? (
            <p>INN valid</p>
          ) : (
            <p>INN not valid</p>
          )}
        </InputFormWrapper>
        <p style={{ fontWeight: "600" }}>Expected Annual Volume</p>
        <p> The quantity your business will require annually.</p>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder=""
            value={annualVolume}
            onChange={setAnnualVolume}
          />
          <Input
            styleType={InputStyle.BORDERED}
            placeholder=""
            value={"Kg"}
            onChange={() => {}}
            disabled={true}
          />
        </InputFormWrapper>
        <p>Comments on the order</p>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder=""
            onChange={setCommentsOnDelivery}
            value={commentsOnDelivery}
          />
        </InputFormWrapper>
      </FormsContainer>

      <Button
        disabled={!isInn(individualTaxpayerNumber)}
        styleType={ButtonStyle.BLUE}
        text="Submit"
        onClick={onSubmit}
      />
    </DrowerFormWrapper>
  );
};

const FormsContainer = styled.div``;

export default QuoteForm;
