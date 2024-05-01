import { CustomPagination } from './components/CustomPagination';
import { usePagination } from '../../contexts/paginationContext';

export const Pagination: React.FC = () => {
  const { pageSize, total, onChangePage, onChangeSizePage, page } = usePagination();

  return (
    <CustomPagination
      firstLoading={total ? false : true}
      hideOnSinglePage={true}
      defaultPageSize={16}
      showQuickJumper={false}
      pageSize={pageSize}
      pageSizeOptions={[8, 16, 24]}
      onShowSizeChange={onChangeSizePage}
      current={page}
      simple={true}
      onChange={onChangePage}
      total={total}
    />
  );
};
