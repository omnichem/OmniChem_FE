import React from "react";
import type { StepsProps } from "antd";
import { Popover, Steps } from "antd";
import styled from "styled-components";

const customDot: StepsProps["progressDot"] = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

interface CustomStepsProps {
  current: number;
  size: "default" | "small";
}

const CustomSteps: React.FC<CustomStepsProps> = ({ current, size }) => (
  <StyledSteps
    current={current}
    progressDot={customDot}
    size={size}
    items={[
      {
        title: "Finished",
      },
      {
        title: "In Progress",
      },
      {
        title: "Waiting",
      },
    ]}
  />
);

const StyledSteps = styled(Steps)``;

export default CustomSteps;
