import React from "react";
import { Input } from "antd";

interface InputProps {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  addonBefore?: React.ReactNode;
  disabled?: boolean;
  maxLength?: number;
  style?: React.CSSProperties;
  status?: "error" | "warning" | "";
  name: string;
}

export const CustomInput: React.FC<InputProps> = ({
  placeholder,
  onChange,
  value,
  addonBefore,
  disabled,
  maxLength,
  style,
  status,
  name,
}) => {
  return (
    <Input
      style={style}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      disabled={disabled}
      maxLength={maxLength}
      addonBefore={addonBefore}
      status={status}
      name={name}
    />
  );
};
