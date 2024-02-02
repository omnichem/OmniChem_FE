import React from "react";
import { Pagination, PaginationProps } from "antd";

import styled from "styled-components";

interface CustomPaginationProps {
  total: number;
  current: number;
  onChange: PaginationProps["onChange"];
  defaultPage?: number;
  simple: boolean;
  onShowSizeChange: PaginationProps['onShowSizeChange'];
  pageSizeOptions: number[];
  showQuickJumper: boolean;
  defaultPageSize: number;
  pageSize: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  defaultPage,
  simple,
  total,
  current,
  onChange,
  onShowSizeChange,
  pageSizeOptions,
  showQuickJumper,
  defaultPageSize,
  pageSize
}) => {
  return (
    <StyledPagination
    defaultPageSize={defaultPageSize}
      simple={simple}
      current={current}
      defaultCurrent={defaultPage}
      onChange={onChange}
      total={total}
      showTotal={(total) => `Total ${total} items`}
      pageSizeOptions={pageSizeOptions}
      onShowSizeChange={onShowSizeChange}
      showQuickJumper={showQuickJumper}
      responsive={true}
      pageSize={pageSize}
    />
  );
};

const StyledPagination = styled(Pagination)``;

export default CustomPagination;
