import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { CardMaterial, CardMaterialResponse } from '../../shared/types/pagesTypes';
import { useGlobalSearch } from '../../contexts/globalSearchContext';
import { useNavigate } from 'react-router';
import { http } from '../../shared/const/http';
import { Col, Row } from 'antd';

import { MaterialCard2 } from './components/MaterialCard2';
import { usePagination } from '../../contexts/paginationContext';
import { useFilter } from '../../contexts/filterContext';

export const MaterialList = () => {
  const [materials, setMaterials] = useState<CardMaterial[]>([]);
  const { page, pageSize, setTotal } = usePagination();
  const debouncedMaterial = useDebounce(materials, 600000);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMaterial] = useGlobalSearch();
  const debouncedSearchMaterial = useDebounce(searchMaterial, 200);

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
      console.log(filterStore);
      // открывает страницу -) отлетает запрос -) пользователь меняет страницу (размонтирует целевой компонент) -) приходит ответ и пытаемся установить состояние
      return () => {
        materialsController.abort();
        filtersController.abort();
      };
    };
    fetchData();
  }, [page, debouncedMaterial, pageSize, debouncedSearchMaterial, filterStore]);

  const onCardClick = (materialId: number) => {
    navigate(`/material/${materialId}`);
  };

  return (
    <Row wrap={true} gutter={[16, 16]}>
      {materials?.map((material: CardMaterial) => (
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
          <MaterialCard2
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
      ))}
    </Row>
  );
};
