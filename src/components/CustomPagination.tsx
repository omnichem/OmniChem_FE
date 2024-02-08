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
  hideOnSinglePage: boolean;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  defaultPage,
  simple,
  total,
  current,
  onChange,
  onShowSizeChange,
  pageSizeOptions,
  showQuickJumper,
  defaultPageSize,
  pageSize,
  hideOnSinglePage
}) => {
  return (
    <StyledPagination
      hideOnSinglePage={hideOnSinglePage}
      defaultPageSize={defaultPageSize}
      simple={simple}
      current={current}
      defaultCurrent={defaultPage}
      onChange={onChange}
      total={total}
      showTotal={(total) => `Найдено ${total} Позиций`}
      pageSizeOptions={pageSizeOptions}
      onShowSizeChange={onShowSizeChange}
      showQuickJumper={showQuickJumper}
      responsive={true}
      pageSize={pageSize}
    />
  );
};

const StyledPagination = styled(Pagination)`

`;
