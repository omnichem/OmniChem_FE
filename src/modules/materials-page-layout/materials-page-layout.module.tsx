import { Flex } from 'antd';
import { Pagination } from '../pagination';
import { FilterList } from '../filter-list';
import { MaterialList } from '../material-list';

export const MaterialsPageLayout = () => {
  return (
    <Flex vertical gap={20}>
      <Pagination />
      <Flex gap={20} style={{ padding: '20px', boxSizing: 'border-box', width: '100%' }}>
        <FilterList />
        <MaterialList />
      </Flex>
    </Flex>
  );
};
