import React from 'react';
import { Pagination, PaginationProps } from 'antd';
import '../styles/customPaginationStyle.css';
import styled from 'styled-components';

interface CustomPaginationProps {
  total?: number;
  current: number;
  onChange: PaginationProps['onChange'];
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
  total = 0,
  current,
  onChange,
  onShowSizeChange,
  pageSizeOptions,
  showQuickJumper,
  defaultPageSize,
  pageSize,
  hideOnSinglePage,
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
      showTotal={total => `Найдено ${total} Позиций`}
      pageSizeOptions={pageSizeOptions}
      onShowSizeChange={onShowSizeChange}
      showQuickJumper={showQuickJumper}
      responsive={true}
      pageSize={pageSize}
    />
  );
};

const StyledPagination = styled(Pagination)`
  border-radius: 8px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  background-color: #ffffff;
  padding: 10px;
`;
