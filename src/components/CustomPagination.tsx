import React, { useEffect, useState } from 'react';
import { Pagination, PaginationProps } from 'antd';
import './customPaginationStyle.css';

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
  style?: React.CSSProperties;
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
  style,
}) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledPagination
      className={`myStickyComponent ${isSticky ? 'sticky' : ''}`}
      style={style}
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

const StyledPagination = styled(Pagination)``;
