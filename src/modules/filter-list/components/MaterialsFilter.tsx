import { Alert } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CollapseBlock, CustomButton } from '../../../shared/components';
import { RowVirtualizerFixed } from '../../../shared/components/RowVirtualizerFixed';
import { FilterItem } from './FilterItem';
import { Filter } from '../../../shared/types/pagesTypes';

interface FilterProps {
  filterData?: Filter[];
  filterStore: string[];
  checkFilter: (e: CheckboxChangeEvent) => void;
}

export const MaterialsFilter: React.FC<FilterProps> = ({ filterData, filterStore, checkFilter }) => {
  const filterRender = filterData?.map(filter => {
    return {
      key: `filter${filter.translated_name}`,
      label: filter.translated_name,
      children: (
        <div>
          <div style={{ height: '300px' }}>
            <RowVirtualizerFixed
              itemRenderer={text => (
                <FilterItem
                  checked={filterStore.includes(`${filter.translated_name}=${text}`)}
                  text={text}
                  filterCategory={filter.translated_name}
                  onChange={checkFilter}
                />
              )}
              data={filter.attribute_values}
            />
          </div>
        </div>
      ),
    };
  });
  console.log(filterRender);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'sticky',
        top: '77px',
        backgroundColor: '#ffffff',
        padding: '10px',
        borderRadius: '8px',
        boxShadow:
          '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
      }}
    >
      <Alert style={{ fontSize: '21px' }} message="Фильтры" />
      <CollapseBlock items={filterRender} />
      <CustomButton text="Сбросить фильтры" type="primary" onClick={() => {}} />
    </div>
  );
};
