import { LoadingOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { PaginationProps, CheckboxProps, Layout, Spin, Alert, Avatar, Popover, Flex } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { http } from '../const/http';
import useDebounce from '../hooks/useDebounce';
import { CardMaterial, CardMaterialResponse, Filter } from '../types/pagesTypes';
import { Logo } from '../components/Logo';
import { CustomButton, CustomInput } from '../components';
import '../styles/loading.css';

import { PersistedKey } from '../const/persistedKey';
import { CustomModal } from '../components/CustomModal';
import { AuthForm } from './authModalForm/AuthForm';

import { MaterialCardsPageContent } from './MaterialCardsPageContent';
import { CustomHeader } from '../components/CustomHeader';

import { useAuth } from '../contexts/authContext';

export const MaterialCardsPage = () => {
  const { isAuthorized, logOut } = useAuth();
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
  const [isAuthModalOpen, setIsReqModalOpen] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await http
        .get<CardMaterialResponse>(
          `/API/v2/wiki/materials/?${userFilters}&search=${encodeURI(
            debouncedSearchMaterial
          )}&page=${page}&page_size=${pageSize}`
        )
        .then(materials => {
          setTotal(materials.data.count);
          setMaterials(materials.data.results);
        });
      await http.get('/API/v2/wiki/filters/').then(filters => {
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

  const openAuthModal = () => {
    setIsReqModalOpen(true);
  };

  const content = (
    <Flex vertical>
      <CustomButton
        style={{ flexBasis: 'flexStart' }}
        type="text"
        text="Профиль"
        onClick={() => navigate('/profile')}
      />
      <CustomButton type="text" text="Выйти из системы" onClick={logOut} />
    </Flex>
  );

  return (
    <Layout>
      <CustomModal isModalOpen={isAuthModalOpen} handleModalCancel={() => setIsReqModalOpen(false)}>
        <AuthForm />
      </CustomModal>
      <CustomHeader>
        <Logo height={36} width={170} />
        <CustomInput
          size="large"
          style={{ maxWidth: '600px' }}
          name="searchMaterialInput"
          placeholder="Введите то, что вы хотите найти"
          onChange={setSearchMaterial}
          value={searchMaterial}
          addonBefore={<SearchOutlined />}
        />
        <AuthContainer>
          {isAuthorized ? (
            <>
              <Popover content={content} trigger="click">
                <Avatar size={39} icon={<UserOutlined />} />
              </Popover>
            </>
          ) : (
            <CustomButton type="text" text="Войти в систему" onClick={() => openAuthModal()} />
          )}
        </AuthContainer>
      </CustomHeader>

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
