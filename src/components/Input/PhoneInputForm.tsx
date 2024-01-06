import React from "react";
import MaskedInput from "react-text-mask";
import Input from "./Input";

interface PhoneInputFormProps {
  value: string;
  onChange: () => void;
}

const PhoneInputForm: React.FC<PhoneInputFormProps> = ({ value, onChange }) => {
  return (
    <>
      <MaskedInput
        mask={[
          "(",
          /[1-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        guide={true}
        render={() => (
          <Input
            placeholder="+7 (999) 999 99 99"
            onChange={onChange}
            value={value}
          />
        )}
      />
    </>
  );
};

export default PhoneInputForm;
