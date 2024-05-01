import { Alert } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CollapseBlock, CustomButton } from '../../../shared/components';
import { RowVirtualizerFixed } from '../../../shared/components/RowVirtualizerFixed';
import { FilterItem } from './FilterItem';
import { Filter } from '../../../shared/types/pagesTypes';
import { styled } from 'styled-components';

interface FilterProps {
  filterData?: Filter[];
  filterStore: string[];
  checkFilter: (e: CheckboxChangeEvent) => void;
  deleteFilters: () => void;
}

const Test: React.FC<any> = ({ filterStore, filter, checkFilter }) => {
  console.log(4, filterStore);
  return (
    <div>
      <div style={{ height: '300px' }}>
        <RowVirtualizerFixed
          itemRenderer={text => {
            console.log({
              filterStore,
              filter,
              text,
              checked: filterStore.includes(`${filter.translated_name}=${text}`),
            });
            return (
              <FilterItem
                checked={filterStore.includes(`${filter.translated_name}=${text}`)}
                text={text}
                filterCategory={filter.translated_name}
                onChange={checkFilter}
              />
            );
          }}
          data={filter.attribute_values}
        />
      </div>
    </div>
  );
};

export const MaterialsFilter: React.FC<FilterProps> = ({ filterData, filterStore, checkFilter, deleteFilters }) => {
  const filterRender = filterData?.map(filter => {
    return {
      key: `filter${filter.translated_name}`,
      label: filter.translated_name,
      forceRender: true,
      children: <Test filterStore={filterStore} filter={filter} checkFilter={checkFilter} />,
    };
  });

  console.log(filterRender);
  return (
    <FilterContainer>
      <Alert style={{ fontSize: '21px' }} message="Фильтры" />
      <CollapseBlock items={filterRender} />
      <CustomButton text="Сбросить фильтры" type="primary" onClick={deleteFilters} />
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
`;
