import { CheckboxProps } from 'antd/es/checkbox';
import { Filter } from '../../shared/types/pagesTypes';
import { MaterialsFilter } from './components';
import { useEffect, useState } from 'react';
import { http } from '../../shared/const/http';
import { useFilter } from '../../contexts/filterContext';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Alert, Flex } from 'antd';
import styled from 'styled-components';

export const FilterList = () => {
  const [filtersResponse, setFiltersResponse] = useState<Filter[]>([]);
  const [filterStore, setFilterStore] = useFilter();
  const [firstLoading, setFirstLoading] = useState(true);
  useEffect(() => {
    const materialsController = new AbortController();
    const filtersController = new AbortController();

    const fetchData = async () => {
      const filters = await http.get('/API/v2/wiki/filters/', { signal: filtersController.signal });

      setFiltersResponse(filters.data);
      setFirstLoading(false);

      // открывает страницу -) отлетает запрос -) пользователь меняет страницу (размонтирует целевой компонент) -) приходит ответ и пытаемся установить состояние
      return () => {
        materialsController.abort();
        filtersController.abort();
      };
    };
    fetchData();
  }, []);

  if (firstLoading) {
    return (
      <SpinWrapper vertical gap={30} justify="center" align="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} size="large"></Spin>
        <Alert message="Фильтры для сырья загружаются..." description="Пожалуйста, подождите." type="info" />
      </SpinWrapper>
    );
  }

  if (filtersResponse.length == 0) {
    return (
      <Alert
        message="Фильтры не подгрузились :("
        description="Мы уже работаем над решением данной проблемы"
        type="info"
      />
    );
  }

  const checkFilter: CheckboxProps['onChange'] = event => {
    const value = event.target.value;
    if (filterStore.includes(value)) {
      setFilterStore(prev => prev.filter(item => item !== value));
    } else {
      setFilterStore(prev => [...prev, value]);
    }
  };

  const deleteFilters = () => {
    setFilterStore([]);
  };
  console.log(1);
  return (
    <MaterialsFilter
      deleteFilters={deleteFilters}
      checkFilter={checkFilter}
      filterData={filtersResponse}
      filterStore={filterStore}
    />
  );
};

const SpinWrapper = styled(Flex)`
  height: calc(100vh - 133px);
  width: 100%;
  /* background-color: #ffffff; */
  outline: 3px dashed;
  border-radius: 8px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  padding: 20px;
  box-sizing: border-box;
  max-height: 400px;
`;
