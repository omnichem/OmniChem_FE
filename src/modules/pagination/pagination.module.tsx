import { Flex } from 'antd';
import React from 'react';
import { CustomPagination } from './components/CustomPagination';

import { usePagination } from '../../contexts/paginationContext';

export const Pagination: React.FC = () => {
  const { pageSize, total, onChangePage, onChangeSizePage, page } = usePagination();
  return (
    <Flex justify="center" style={{ position: 'sticky', top: '77px', zIndex: 10 }}>
      <CustomPagination
        style={{ borderRadius: '4px', backgroundColor: '#f5f5f5', padding: '10px' }}
        hideOnSinglePage={true}
        defaultPageSize={15}
        showQuickJumper={false}
        pageSize={pageSize}
        pageSizeOptions={[9, 15, 21]}
        onShowSizeChange={onChangeSizePage}
        current={page}
        simple={true}
        onChange={onChangePage}
        total={total}
      />
    </Flex>
  );
};
