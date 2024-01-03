import React from "react";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};

const CustomCheckBox: React.FC = () => <Checkbox onChange={onChange} />;

export default CustomCheckBox;
