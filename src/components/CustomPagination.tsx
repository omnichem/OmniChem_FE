import React from "react";
import { Pagination, type PaginationProps } from "antd";

import styled from "styled-components";

interface CustomPaginationProps {
  total: number;
  current: number;
  onChange: PaginationProps["onChange"];
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  current,
  total,
  onChange,
}) => {
  return (
    <StyledPagination current={current} onChange={onChange} total={total} />
  );
};

const StyledPagination = styled(Pagination)``;

export default CustomPagination;
