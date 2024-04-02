import { MaterialCard2 } from '../components/MaterialCard/MaterialCard2';
import { MaterialsFilter } from '../components/filters/MaterialsFilter';
import Sider from 'antd/es/layout/Sider';
import { CustomPagination } from '../components/CustomPagination';
import { Content } from 'antd/es/layout/layout';
import { Layout, Flex, Row, Col } from 'antd';

import { CardMaterial, Filter } from '../types/pagesTypes';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface MaterialCardsPageContentProps {
  checkFilter: (e: CheckboxChangeEvent) => void;
  filtersResponse: Filter[];
  filterStore: string[];
  pageSize: number;
  onChangeSizePage: (current: number, size: number) => void;
  onChangePage: (page: number, pageSize: number) => void;
  page: number;
  total: number;
  materials: CardMaterial[];
  isLoading: boolean;
  onCardClick: (materialId: number) => void;
}

export const MaterialCardsPageContent: React.FC<MaterialCardsPageContentProps> = ({
  checkFilter,
  filtersResponse,
  filterStore,
  pageSize,
  onChangeSizePage,
  page,
  onChangePage,
  total,
  materials,
  isLoading,
  onCardClick,
}) => {
  return (
    <Layout>
      <Sider
        breakpoint="xl"
        collapsedWidth="0"
        width={300}
        style={{ backgroundColor: '#f5f5f5', padding: '97px 0 10px 20px' }}
      >
        <MaterialsFilter checkFilter={checkFilter} filterData={filtersResponse} filterStore={filterStore} />
      </Sider>
      <Layout style={{ padding: '24px 24px 24px', height: '100%' }}>
        <Content style={{ display: 'flex', gap: '20px', flexDirection: 'column', height: '100%' }}>
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
          <Row wrap={true} gutter={[16, 16]}>
            {materials.map((material: CardMaterial) => (
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
        </Content>
      </Layout>
    </Layout>
  );
};
