import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { PaginationProps, CheckboxProps, Layout, Flex, Row, Col, Alert, Spin, Collapse } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { http } from '../const/http';
import useDebounce from '../hooks/useDebounce';
import { CardMaterial, CardMaterialResponse, Filter } from '../types/pagesTypes';
import { Logo } from '../components/Logo';
import { CustomButton, CustomInput } from '../components';
import { CustomPagination } from '../components/CustomPagination';
import '../styles/loading.css';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { PersistedKey } from '../const/persistedKey';
import { CustomModal } from '../components/CustomModal';
import { RegisterForm } from './authModalContent/registerPages/RegisterForm';
import { LoginForm } from './authModalContent/loginPages/LoginForm';
import { MaterialCard2 } from '../components/MaterialCard/MaterialCard2';
import { MaterialsFilter } from '../components/filters/MaterialsFilter';

const MaterialCardsPage = () => {
  const [materials, setMaterials] = useState<CardMaterial[]>();
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
  const [searchMaterial, setSearchMaterial] = useState(() => {
    const target = sessionStorage.getItem(PersistedKey.SearchMaterial);
    if (!target) {
      sessionStorage.setItem(PersistedKey.SearchMaterial, '');
      return '';
    }
    return '';
  });
  const debouncedSearchMaterial = useDebounce(searchMaterial, 200);
  const [filtersResponse, setFiltersResponse] = useState<Filter[]>([]);
  const [userFilters, setUserFilters] = useState('');
  const [filterStore, setFilterStore] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isRegModalOpen, setIsReqModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await http
        .get<CardMaterialResponse>(
          `/API/v2/wiki/materials/?${userFilters}&search=${encodeURI(
            debouncedSearchMaterial
          )}&page=${page}&page_size=${pageSize}`
        )
        .then(materials => {
          setTotal(materials.data.count);
          setMaterials(materials.data.results);
        });
      const filtersResponseReq = await http.get('/API/v2/wiki/filters/').then(filters => {
        setFiltersResponse(filters.data);
      });

      setIsLoading(false);
      setUserFilters(filterStore.join('&'));
      setFirstLoading(false);
    };
    fetchData();
  }, [page, debouncedMaterial, pageSize, debouncedSearchMaterial, userFilters, filterStore]);

  const onChangePage: PaginationProps['onChange'] = (page: number) => {
    setPage(page);
    sessionStorage.setItem(PersistedKey.Page, page.toString());
  };

  const onChangeSizePage: PaginationProps['onShowSizeChange'] = (current: number, size: number) => {
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

  const clickRegisterButton = () => {
    setIsLogModalOpen(false);
    setIsReqModalOpen(true);
  };

  const clickLoginButton = () => {
    setIsReqModalOpen(false);
    setIsLogModalOpen(true);
  };

  return (
    <Layout>
      <CustomModal isModalOpen={isRegModalOpen} handleModalCancel={() => setIsReqModalOpen(false)}>
        <RegisterForm submitBuyerRegister={() => {}} submitSupplierRegister={() => {}} loginButton={clickLoginButton} />
      </CustomModal>
      <CustomModal isModalOpen={isLogModalOpen} handleModalCancel={() => setIsLogModalOpen(false)}>
        <LoginForm submitBuyerLogin={() => {}} submitSupplierLogin={() => {}} registerButton={clickRegisterButton} />
      </CustomModal>
      <Header
        style={{
          padding: '10px',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          position: 'sticky',
          top: '0',
          zIndex: '10',
          height: 'auto',
          backgroundColor: '#ffffff',
        }}
      >
        <Logo height={36} width={170} />
        <CustomInput
          name="searchMaterialInput"
          placeholder="Введите то, что вы хотите найти"
          onChange={setSearchMaterial}
          value={searchMaterial}
          addonBefore={<SearchOutlined />}
        />
        <AuthContainer>
          <CustomButton type="text" text="Войти в систему" onClick={() => setIsLogModalOpen(true)} />
          <CustomButton type="primary" text="Зарегистрироваться" onClick={() => setIsReqModalOpen(true)} />
        </AuthContainer>
      </Header>
      {firstLoading ? (
        <Spin style={{ zIndex: '9' }} indicator={<LoadingOutlined />} fullscreen={true} size="large" />
      ) : (
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
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}

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
                  >
                    <MaterialCard2
                      is_supplier_available={material.is_supplier_available}
                      loading={isLoading}
                      id={material.id}
                      clickButton={onCardClick}
                      key={material.id}
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
      )}

      {/* <Footer style={{ textAlign: 'center' }}>OmniChem ©{new Date().getFullYear()}</Footer> */}
    </Layout>
  );
};

export default MaterialCardsPage;

export const FilterSearchWrpapper = styled.div`
  box-sizing: border-box;
  position: sticky;
  top: 0;
`;

export const MaterialsListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const HeaderLogo = styled.div`
  width: 170px;
  height: 36px;
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  padding-bottom: 50px;
  margin: 0 auto;
  max-width: 1440px;

  @media (min-width: 320px) and (max-width: 768px) {
    display: flex;

    gap: 20px;

    max-width: 310px;

    .dropDown {
      width: 100%;
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 40px;
  min-width: 600px;

  border-radius: 5px;
  outline: 1px solid #6386a5;
  overflow: hidden;
  &:hover {
    outline: 1px solid #383a3b;
  }
  &:focus-within {
    outline: 1px solid #383a3b;
  }
  /* border: 1px solid #383a3b; */
`;

export const Categories = styled.div`
  height: 100%;

  flex: 1;

  background-color: #ffffff;
`;

export const InputIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 40px;

  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
`;

export const VerticalDivider = styled.div`
  width: 0px;
  height: 24px;
  border-style: solid;
  border-width: 0px 0px 0px 2px;
  border-color: rgb(204, 204, 204);
`;

export const InputWrapper = styled.div`
  flex: 2;
`;
