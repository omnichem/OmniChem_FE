import { CheckboxProps } from 'antd/es/checkbox';
import { Filter } from '../../shared/types/pagesTypes';
import Sider from 'antd/es/layout/Sider';
import { MaterialsFilter } from './components';
import { useEffect, useState } from 'react';
import { http } from '../../shared/const/http';
import { useFilter } from '../../contexts/filterContext';

export const FilterList = () => {
  const [filtersResponse, setFiltersResponse] = useState<Filter[]>([]);
  const [filterStore, setFilterStore] = useFilter();
  useEffect(() => {
    const materialsController = new AbortController();
    const filtersController = new AbortController();

    const fetchData = async () => {
      const filters = await http.get('/API/v2/wiki/filters/', { signal: filtersController.signal });

      setFiltersResponse(filters.data);

      // открывает страницу -) отлетает запрос -) пользователь меняет страницу (размонтирует целевой компонент) -) приходит ответ и пытаемся установить состояние
      return () => {
        materialsController.abort();
        filtersController.abort();
      };
    };
    fetchData();
  }, []);

  const checkFilter: CheckboxProps['onChange'] = event => {
    const value = event.target.value;
    if (filterStore.includes(value)) {
      setFilterStore(prev => prev.filter(item => item !== value));
    } else {
      setFilterStore(prev => [...prev, value]);
      // setFilter(filterStore.join('&'));
    }
  };

  return (
    <Sider breakpoint="xl" collapsedWidth="0" width={300} style={{ backgroundColor: '#f5f5f5' }}>
      <MaterialsFilter checkFilter={checkFilter} filterData={filtersResponse} filterStore={filterStore} />
    </Sider>
  );
};
