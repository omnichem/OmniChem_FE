import { LoadingOutlined } from '@ant-design/icons';
import { PaginationProps, CheckboxProps, Layout, Spin, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { http } from '../const/http';
import useDebounce from '../hooks/useDebounce';
import { CardMaterial, CardMaterialResponse, Filter } from '../types/pagesTypes';
import '../styles/loading.css';

import { PersistedKey } from '../const/persistedKey';

import { useGlobalSearch } from '../contexts/globalSearchContext';
import { MaterialCardsPageContent } from './MaterialCardsPageContent';

export const MaterialCardsPage = () => {
  const [materials, setMaterials] = useState<CardMaterial[]>([]);
  const [total, setTotal] = useState(50);
  const [page, setPage] = useState(() => {
    const target = sessionStorage.getItem(PersistedKey.Page);
    if (!target) {
      sessionStorage.setItem(PersistedKey.Page, '1');
      return 1;
    }
    return parseInt(target);
  });
  const [pageSize, setPageSize] = useState(() => {
    const target = sessionStorage.getItem(PersistedKey.PageSize);
    if (!target) {
      sessionStorage.setItem(PersistedKey.PageSize, '15');
      return 15;
    }
    return parseInt(target);
  });
  const debouncedMaterial = useDebounce(materials, 600000);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMaterial] = useGlobalSearch();
  const debouncedSearchMaterial = useDebounce(searchMaterial, 200);
  const [filtersResponse, setFiltersResponse] = useState<Filter[]>([]);
  const [userFilters, setUserFilters] = useState('');
  const [filterStore, setFilterStore] = useState<string[]>([]);
  const navigate = useNavigate();
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    const materialsController = new AbortController();
    const filtersController = new AbortController();
    setIsLoading(true);

    const fetchData = async () => {
      const materials = await http.get<CardMaterialResponse>(
        `/API/v2/wiki/materials/?${userFilters}&search=${encodeURI(
          debouncedSearchMaterial
        )}&page=${page}&page_size=${pageSize}`,
        { signal: materialsController.signal }
      );
      const filters = await http.get('/API/v2/wiki/filters/', { signal: filtersController.signal });

      setTotal(materials.data.count);
      setMaterials(materials.data.results);
      setFiltersResponse(filters.data);
      setIsLoading(false);
      setUserFilters(filterStore.join('&'));
      setFirstLoading(false);
      // открывает страницу -) отлетает запрос -) пользователь меняет страницу (размонтирует целевой компонент) -) приходит ответ и пытаемся установить состояние
      return () => {
        materialsController.abort();
        filtersController.abort();
      };
    };
    fetchData();
  }, [page, debouncedMaterial, pageSize, debouncedSearchMaterial, userFilters, filterStore]);

  const onChangePage: PaginationProps['onChange'] = (page: number) => {
    setPage(page);
    sessionStorage.setItem(PersistedKey.Page, page.toString());
  };

  const onChangeSizePage: PaginationProps['onShowSizeChange'] = (_: number, size: number) => {
    setPageSize(size);
    sessionStorage.setItem(PersistedKey.PageSize, size.toString());
  };

  const checkFilter: CheckboxProps['onChange'] = event => {
    const value = event.target.value;
    if (filterStore.includes(value)) {
      setFilterStore(prev => prev.filter(item => item !== value));
    } else {
      setFilterStore(prev => [...prev, value]);
      // setUserFilters(filterStore.join("&"))
    }
  };

  const onCardClick = (materialId: number) => {
    navigate(`/material/${materialId}`);
  };

  return (
    <Layout>
      {firstLoading ? (
        <Spin style={{ zIndex: '9' }} indicator={<LoadingOutlined />} fullscreen={true} size="large" />
      ) : (
        <>
          {materials ? (
            <MaterialCardsPageContent
              checkFilter={checkFilter}
              filtersResponse={filtersResponse}
              filterStore={filterStore}
              pageSize={pageSize}
              onChangeSizePage={onChangeSizePage}
              onChangePage={onChangePage}
              page={page}
              total={total}
              materials={materials}
              onCardClick={onCardClick}
              isLoading={isLoading}
            />
          ) : (
            <Alert message={'Мы ничего не нашли :('} />
          )}
        </>
      )}
      {/* <Footer style={{ textAlign: 'center' }}>OmniChem ©{new Date().getFullYear()}</Footer> */}
    </Layout>
  );
};
