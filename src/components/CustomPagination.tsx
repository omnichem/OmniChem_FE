import React from "react";
import { Pagination, PaginationProps } from "antd";

import styled from "styled-components";

interface CustomPaginationProps {
  total: number;
  current: number;
  onChange: PaginationProps["onChange"];
  defaultPage: number;
  simple: boolean;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  defaultPage,
  simple,
  total,
  onChange,
}) => {
  return (
    <StyledPagination
      simple={simple}
      defaultCurrent={defaultPage}
      onChange={onChange}
      total={total}
    />
  );
};

const StyledPagination = styled(Pagination)``;

export default CustomPagination;
