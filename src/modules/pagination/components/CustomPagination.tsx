import React from 'react';
import { Alert, Flex, Pagination, PaginationProps, Spin } from 'antd';
import '../styles/customPaginationStyle.css';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

interface CustomPaginationProps {
  total: number | undefined;
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
  firstLoading: boolean;
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
  firstLoading,
}) => {
  if (firstLoading) {
    return (
      <PaginationLoadingWrapper justify="center" align="center" gap={40}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />}></Spin>
        <Alert message="Данные о количестве сырья и страниц загружаются... Пожалуйста, подождите." type="info" />
      </PaginationLoadingWrapper>
    );
  }
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

const PaginationLoadingWrapper = styled(Flex)`
  height: 60px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  border-radius: 8px;
  outline: 3px dashed;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
`;
