import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { PaginationProps, CheckboxProps, Layout, Breadcrumb, Flex, Row, Col, Collapse, Alert, Spin, Checkbox, Avatar, List, Typography } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { http } from "../const/http";
import useDebounce from "../hooks/useDebounce";
import { CardMaterial, CardMaterialResponse, Filter } from "../types/pagesTypes";
import { Logo } from "../components/Logo";
import { CollapseBlock, CustomButton, CustomInput } from "../components";
import { CustomPagination } from "../components/CustomPagination";
import "../styles/loading.css"
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { RowVirtualizerFixed } from "../components/RowVirtualizerFixed";
import { PersistedKey } from "../const/persistedKey";
import { CustomModal } from "../components/CustomModal";
import { RegisterForm } from "./authModalContent/registerPages/RegisterForm";
import { LoginForm } from "./authModalContent/loginPages/LoginForm";
import { MaterialCard2 } from "../components/MaterialCard/MaterialCard2";
import VirtualList from 'rc-virtual-list';
import { FilterItem } from "../components/FilterItem";

const MaterialCardsPage = () => {
  const [materials, setMaterials] = useState<CardMaterial[]>();
  const [total, setTotal] = useState(50);
  const [page, setPage] = useState(() => {
    const target = sessionStorage.getItem(PersistedKey.Page)
    if (!target) {
      sessionStorage.setItem(PersistedKey.Page, "1")
      return 1
    }
    return parseInt(target)
  });
  const [pageSize, setPageSize] = useState(() => {
    const target = sessionStorage.getItem(PersistedKey.PageSize)
    if (!target) {
      sessionStorage.setItem(PersistedKey.PageSize, "15")
      return 15
    }
    return parseInt(target)
  }
  )
  const debouncedMaterial = useDebounce(materials, 600000);
  const [isLoading, setIsLoading] = useState(false)
  const [searchMaterial, setSearchMaterial] = useState(() => {
    const target = sessionStorage.getItem(PersistedKey.SearchMaterial)
    if (!target) {
      sessionStorage.setItem(PersistedKey.SearchMaterial, "")
      return ""
    }
    return ""
  })
  const debouncedSearchMaterial = useDebounce(searchMaterial, 200);
  const [filtersResponse, setFiltersResponse] = useState<Filter[]>()
  const [userFilters, setUserFilters] = useState("")
  const onChangePage: PaginationProps["onChange"] = (page: number) => {
    setPage(page);
    sessionStorage.setItem(PersistedKey.Page, page.toString())
  };

  const onChangeSizePage: PaginationProps['onShowSizeChange'] = (current: number, size: number) => {
    setPageSize(size)
    sessionStorage.setItem(PersistedKey.PageSize, size.toString())
  };

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const response = await http.get<CardMaterialResponse>(
        `/API/v2/wiki/materials/?${userFilters}&search=${encodeURI(debouncedSearchMaterial)}&page=${page}&page_size=${pageSize}`
      );
      // /API/v2/wiki/materials/?company=Franklin Fibre&company=SIRG
      const filtersResponseReq = await http.get("/API/v2/wiki/filters/")
      console.log(response)
      console.log(filtersResponse)
      setFiltersResponse(filtersResponseReq.data)
      setTotal(response.data.count);
      setMaterials(response.data.results);
      setIsLoading(false)
    };
    fetchData();
  }, [page, debouncedMaterial, pageSize, debouncedSearchMaterial, userFilters]);

  const navigate = useNavigate();

  const onCardClick = (materialId: number) => {
    navigate(`/material/${materialId}`);
  };

  const [filterStore, setFilterStore] = useState<string[]>([])
  console.log(filterStore)
  console.log(userFilters)

  const CheckFilter: CheckboxProps['onChange'] = (event) => {
    const value = event.target.value;
    if (filterStore.includes(value)) {
      setFilterStore(filterStore.filter(item => item !== value));
    } else {
      setFilterStore([...filterStore, value]);
      // setUserFilters(filterStore.join("&"))
    }
  };

  useEffect(() => {
    setUserFilters(filterStore.join('&'));
  }, [filterStore]);

  const [isRegModalOpen, setIsReqModalOpen] = useState(false)
  const [isLogModalOpen, setIsLogModalOpen] = useState(false)

  const clickRegisterButton = () => {
    setIsLogModalOpen(false)
    setIsReqModalOpen(true)
  }

  const clickLoginButton = () => {
    setIsReqModalOpen(false)
    setIsLogModalOpen(true)
  }

  // const [filtersList, setFiltersList] = useState()
  // const [searchFilterInput, setSearchFilterInput] = useState("")

  // const filterSearch = (searchFilter: string, listOfFilters: string[]) => {
  //   if (!searchFilter) {
  //     return listOfFilters
  //   }
  //   return listOfFilters.filter((filter) => filter.toLowerCase().includes(searchFilter.toLowerCase()))
  // }

  // useEffect(()=> {
  //   const Debonce = setTimeout(()=> {
  //     const filteredValues = filterSearch(search)
  //   })
  // })

  return (
    <Layout>
      <CustomModal isModalOpen={isRegModalOpen} handleModalCancel={() => setIsReqModalOpen(false)}>
        <RegisterForm submitBuyerRegister={() => { }} submitSupplierRegister={() => { }} loginButton={clickLoginButton} />
      </CustomModal>
      <CustomModal isModalOpen={isLogModalOpen} handleModalCancel={() => setIsLogModalOpen(false)}>
        <LoginForm submitBuyerLogin={() => { }} submitSupplierLogin={() => { }} registerButton={clickRegisterButton} />
      </CustomModal>
      <Header style={{ padding: "10px", display: 'flex', gap: "20px", alignItems: 'center', position: "sticky", top: "0", zIndex: "10", height: "auto", backgroundColor: "#ffffff" }}>
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
      {

        <Layout>
          <Sider breakpoint="xl" collapsedWidth="0" width={250} style={{ backgroundColor: "#ffffff", padding: "0 5px 0 5px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Alert style={{ fontSize: "21px", borderRadius: "4px" }} message="Фильтры" />
              {
                filtersResponse?.map((filter) => {
                  const items = [{
                    key: `filter${filter.translated_name}`,
                    label: filter.translated_name,
                    children:
                      <div>
                        {/* 
                        {/* <div style={{ height: "300px" }}>
                          {/*  */}
                        {/* <RowVirtualizerFixed text="" filterCategory={filter.translated_name} onChange={CheckFilter} data={filter.attribute_values} /> */}
                        {/* </div> */}
                        <List
                          header={<FilterSearchWrpapper>
                            <CustomInput style={{}} placeholder="Введите название фильтра" name="filter-input" onChange={() => { }} value="" />
                          </FilterSearchWrpapper>}
                          footer={<div>Footer</div>}
                          bordered
                          style={{ height: "300px", overflowY: "scroll", overflowX: "hidden" }}
                          dataSource={filter.attribute_values}
                          renderItem={(item) => (
                            <List.Item>
                              {/* <Checkbox value={""} onChange={CheckFilter} /> */}
                              <FilterItem filterCategory={filter.translated_name} onChange={CheckFilter} text={item} />
                            </List.Item>
                          )}
                        />
                      </div>
                  }]
                  return <CollapseBlock items={items} />
                })
              }
            </div>
          </Sider>
          <Layout style={{ padding: '24px 24px 24px' }} >
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
            <Flex justify="center">
              <CustomPagination

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


            <Content style={{ display: "flex", gap: "20px", flexDirection: "column", height: "100%" }}>
              {
                isLoading ? <Spin style={{ zIndex: "9" }} indicator={<LoadingOutlined />} fullscreen={false} size="large" /> : (
                  <Row wrap={true} gutter={[16, 16]}>
                    {
                      materials?.map((material: CardMaterial) => (
                        <Col
                          // mobile
                          xs={{ span: 23 }}
                          sm={{ span: 24 }}
                          // 175%
                          md={{ span: 12 }}
                          lg={{ span: 6 }}
                          xl={{ span: 8 }}
                          xxl={{ span: 6 }}>

                          <MaterialCard2
                            is_supplier_available={Math.random() < 0.5}
                            loading={isLoading}
                            id={material.id}
                            clickButton={onCardClick}
                            key={material.id}
                            name={material.name}
                            translated_description={material.translated_description}
                            attributes={material.attributes}
                          />
                        </Col>
                      ))
                    }
                  </Row>
                )}

            </Content>
            <Flex justify="center">
              <CustomPagination
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
          </Layout>
        </Layout>
      }

      {/* <Footer style={{ textAlign: 'center' }}>
        OmniChem ©{new Date().getFullYear()}
      </Footer> */}
    </Layout >
  );
};

export default MaterialCardsPage;

export const FilterSearchWrpapper = styled.div`
  box-sizing: border-box;
  position: sticky;
  top: 0;
`

export const MaterialsListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const HeaderLogo = styled.div`
  width: 170px;
  height: 36px;
`

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