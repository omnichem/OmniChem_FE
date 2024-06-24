import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, CopyOutlined, HomeOutlined, BarChartOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col, MenuProps } from 'antd';
import { Footer } from 'antd/es/layout/layout';
// import AnalyticsСontent from './components/analyticsСontent/AnalyticsСontent';
import TableSupplierCatalog from './components/TableSupplierCatalog/TableSupplierCatalog';
import CompanyCardForm from './components/companyCardForm/CompanyCardForm';
import { http } from '../../shared/const/http';
import { RegCompanyForm } from '../../modules/auth/components/RegCompanyForm';
import { CompanyProvider } from '../../contexts/companyContext';

const { Header, Sider, Content } = Layout;

export interface Card {
  tags: boolean;
  id: number;
  distributor_id: number;
  product_name: string;
  manufacturer: string;
  article: unknown;
  availability_status: string;
  is_relationship: boolean;
  raw_material: null;
}

interface ComparisonTableResponse {
  countProductsWithRelationship: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: Card[];
}

const Account: React.FC = () => {
  const [comparisonTable, setComparisonTable] = useState<ComparisonTableResponse>();

  useEffect(() => {
    const fetchComparisonTable = async () => {
      const response = await http.get<ComparisonTableResponse>('/API/v1/commerce/products/');
      setComparisonTable(response.data);
    };
    fetchComparisonTable();
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  type ContentType = string;
  type SetterType = (value: ContentType) => void;

  const [current, setCurrent]: [ContentType, SetterType] = useState('1');

  const navName = ['Компания', 'Аналитика', 'Каталог'];

  const items = [
    { key: '1', icon: <HomeOutlined />, label: navName[0] },
    { key: '2', icon: <BarChartOutlined />, label: navName[1] },
    { key: '3', icon: <CopyOutlined />, label: navName[2] },
  ];

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: '#ffff',
          paddingTop: '15px',
          fontSize: '16px',
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu onClick={onClick} theme="light" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            fontSize: '30px',
            fontWeight: 'bold',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />{' '}
          {navName[parseInt(current) - 1]}
        </Header>
        <Content
          style={{
            fontSize: '16px',
            width: '100vw',
            height: '100vh',
          }}
        >
          {current == '1' ? (
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                maxHeight: '100vh',
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Row>
                <Col xs={20} md={20}>
                  <RegCompanyForm />
                </Col>
              </Row>
            </div>
          ) : current == '2' ? (
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Row>
                <Col xs={20} md={20}>
                  {/* <AnalyticsСontent /> */}
                  {/* Remove RegCompanyForm from here */}
                </Col>
              </Row>
            </div>
          ) : current == '3' ? (
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Row>
                <Col xs={1} md={19}>
                  <TableSupplierCatalog
                    supplierMaterials={comparisonTable?.results.map((material: Card) => {
                      const data = {
                        tags: material.is_relationship,
                        id: material.id,
                        distributor_id: material.distributor_id,
                        product_name: material.product_name,
                        manufacturer: material.manufacturer,
                        article: material.article,
                        availability_status: material.availability_status,
                        is_relationship: material.is_relationship,
                        raw_material: material.raw_material,
                      };
                      return data;
                    })}
                  />
                </Col>
              </Row>
            </div>
          ) : null}
        </Content>
        <Footer style={{ textAlign: 'right' }}>omnichem.ru 2024. All rights reserved.</Footer>
      </Layout>
    </Layout>
  );
};

// Ensure Account is wrapped with CompanyProvider
const AccountWithCompanyProvider: React.FC = () => (
  <CompanyProvider>
    <Account />
  </CompanyProvider>
);

export default AccountWithCompanyProvider;
