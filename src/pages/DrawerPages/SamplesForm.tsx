import React from "react";
import { InputStyle, ButtonStyle } from "../../type";
import { DrowerFormWrapper, InputFormWrapper } from "./Components";
import Input from "../../components/Input";
import Button from "../../components/Button";

interface SamplesFormProps {
  setSamples: () => void;
  numberOfsamples: string;
  market: string;
  setMarket: () => void;
  comment: string;
  setComment: () => void;
  onSubmit: () => void;
  contactPerson: string;
  setContactPerson: () => void;
  deliveryAddress: string;
  setDeliveryAddress: () => void;
  phoneNumber: string;
  setPhoneNumber: () => void;
  commentsOnDelivery: string;
  setCommentsOnDelivery: () => void;
  itn: string;
  setItn: () => void;
}

const SamplesForm: React.FC<SamplesFormProps> = ({ ...SamplesFormProps }) => {
  return (
    <DrowerFormWrapper>
      <div>
        <p>Number of samples requested</p>
        <InputFormWrapper>
          <Input
            placeholder="Number of samples requested"
            styleType={InputStyle.BORDERED}
            onChange={SamplesFormProps.setSamples}
            value={SamplesFormProps.numberOfsamples}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              gap: "7px",
            }}
          >
            <Button styleType={ButtonStyle.GRAY} text="+" onClick={() => {}} />
            <Button styleType={ButtonStyle.GRAY} text="-" onClick={() => {}} />
          </div>
        </InputFormWrapper>
        <p>Input your market</p>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder="Input your market"
            value={SamplesFormProps.market}
            onChange={SamplesFormProps.setMarket}
          />
        </InputFormWrapper>

        <p>Leave comments</p>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder="Comment"
            value={SamplesFormProps.comment}
            onChange={SamplesFormProps.setComment}
          />
        </InputFormWrapper>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder="Contact person"
            value={SamplesFormProps.contactPerson}
            onChange={SamplesFormProps.setContactPerson}
          />
        </InputFormWrapper>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder="DeliveryAddress"
            value={SamplesFormProps.deliveryAddress}
            onChange={SamplesFormProps.setDeliveryAddress}
          />
        </InputFormWrapper>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder="PhoneNumber"
            value={SamplesFormProps.phoneNumber}
            onChange={SamplesFormProps.setPhoneNumber}
          />
        </InputFormWrapper>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder="Comments on delivery"
            value={SamplesFormProps.commentsOnDelivery}
            onChange={SamplesFormProps.setCommentsOnDelivery}
          />
        </InputFormWrapper>
        <InputFormWrapper>
          <Input
            styleType={InputStyle.BORDERED}
            placeholder="Individual taxpayer number"
            value={SamplesFormProps.itn}
            onChange={SamplesFormProps.setItn}
          />
        </InputFormWrapper>
      </div>

      <Button
        styleType={ButtonStyle.BLUE}
        text="Submit"
        onClick={SamplesFormProps.onSubmit}
      />
    </DrowerFormWrapper>
  );
};

export default SamplesForm;
