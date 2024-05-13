import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { CardMaterial, CardMaterialResponse } from '../../shared/types/pagesTypes';
import { useGlobalSearch } from '../../contexts/globalSearchContext';
import { useNavigate } from 'react-router';
import { http } from '../../shared/const/http';
import { Alert, Col, Flex, Row, Spin } from 'antd';

import { MaterialCard } from './components/MaterialCard';
import { usePagination } from '../../contexts/paginationContext';
import { useFilter } from '../../contexts/filterContext';
import { LoadingOutlined, MehOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const MaterialList = () => {
  const [materials, setMaterials] = useState<CardMaterial[]>([]);
  const { pageSize, page, setTotal } = usePagination();

  const [isLoading, setIsLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [searchMaterial] = useGlobalSearch();
  const debouncedSearchMaterial = useDebounce(searchMaterial, 250);

  const [filterStore] = useFilter();
  const navigate = useNavigate();

  useEffect(() => {
    const materialsController = new AbortController();
    const filtersController = new AbortController();
    setIsLoading(true);

    const fetchData = async () => {
      const materials = await http.get<CardMaterialResponse>(
        `/API/v2/wiki/materials/?${filterStore.join('&')}&search=${encodeURI(
          debouncedSearchMaterial
        )}&page=${page}&page_size=${pageSize}`,
        { signal: materialsController.signal }
      );
      setTotal(materials.data.count);
      setMaterials(materials.data.results);

      setIsLoading(false);
      setFirstLoading(false);
      console.log(materials);
      // открывает страницу -) отлетает запрос -) пользователь меняет страницу (размонтирует целевой компонент) -) приходит ответ и пытаемся установить состояние
      return () => {
        materialsController.abort();
        filtersController.abort();
      };
    };
    fetchData();
  }, [page, pageSize, debouncedSearchMaterial, filterStore]);

  const onCardClick = (materialId: number) => {
    navigate(`/material/${materialId}`);
  };

  if (firstLoading) {
    return (
      <ListLoadingWrapper vertical gap={30} justify="center" align="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />}></Spin>
        <Alert message="Данные о сырье загружаются..." description="Пожалуйста, подождите." type="info" />
      </ListLoadingWrapper>
    );
  }

  if (materials.length == 0) {
    return (
      <ListLoadingWrapper justify="center" align="center" vertical gap={40}>
        {/* <InboxOutlined  /> */}
        <MehOutlined style={{ fontSize: '100px' }} />
        <Alert message={'Мы ничего не нашли :('} description="Попробуйте изменить параметры поиска" />
      </ListLoadingWrapper>
    );
  }

  return (
    <Row wrap={true} gutter={[16, 16]} justify={'space-evenly'}>
      {materials?.map((material: CardMaterial) => {
        return (
          <Col
            // mobile
            xs={{ span: 23 }}
            sm={{ span: 24 }}
            // 175%
            md={{ span: 12 }}
            lg={{ span: 6 }}
            xl={{ span: 8 }}
            xxl={{ span: 6 }}
            key={`column${material.id}`}
          >
            <MaterialCard
              company={material.company}
              is_supplier_available={material.is_supplier_available}
              loading={isLoading}
              id={material.id}
              key={`cardKey${material.id}`}
              clickButton={onCardClick}
              name={material.name}
              translated_description={material.translated_description}
              attributes={material.attributes}
            />
          </Col>
        );
      })}
    </Row>
  );
};

const ListLoadingWrapper = styled(Flex)`
  height: calc(100vh - 173px);
  width: 100%;
  height: calc(100vh - 60px);
  /* background-color: #ffffff; */
  border-radius: 8px;
  outline: 3px dashed;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
`;

// const PaginationLoadingWrapper = styled(Flex)`
//   height: auto;
//   width: 100%;
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
//   padding: 20px;
//   box-sizing: border-box;
// `;

// const ContentLoadingWrapper = styled(Flex)`
//   width: 100%;
//   padding: 20px 0 20px 0;
// `;
