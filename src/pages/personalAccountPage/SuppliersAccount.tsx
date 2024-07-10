import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, CopyOutlined, HomeOutlined, BarChartOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Row, Col, MenuProps, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
// import AnalyticsContent from './components/analyticsContent/AnalyticsContent';
import TableSupplierCatalog from './components/TableSupplierCatalog/TableSupplierCatalog';
import { RegCompanyForm } from '../../modules/auth/components/RegCompanyForm';
import { CompanyProvider } from '../../contexts/companyContext';
import { UserProfile } from '../../modules/auth/components/UserProfile';
import { http } from '../../shared/const/http';

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
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  type ContentType = string;
  type SetterType = (value: ContentType) => void;

  const [current, setCurrent]: [ContentType, SetterType] = useState('1');

  const items = [
    { key: '1', icon: <UserOutlined />, label: 'Профиль'},
    { key: '2', icon: <HomeOutlined />, label: 'Компания' },
    { key: '3', icon: <BarChartOutlined />, label: 'Аналитика' },
    { key: '4', icon: <CopyOutlined />, label: 'Каталог' },
    
  ];

  useEffect(() => {
    const fetchComparisonTable = async () => {
      const response = await http.get<ComparisonTableResponse>('/API/v1/commerce/products/');
      setComparisonTable(response.data);
    };
    fetchComparisonTable();
  }, []);

  const onClick: MenuProps['onClick'] = e => {
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
          />
          {items[parseInt(current) - 1].label}
        </Header>
        <Content
          style={{
            fontSize: '16px',
            width: '100vw',
            height: '100vh',
          }}
        >
          {current === '2' && (
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
          )}
          {current === '3' && (
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
                  {/* <AnalyticsContent /> */}
                </Col>
              </Row>
            </div>
          )}
          {current === '4' && (
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
          )}
          {current === '1' && (
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
                  <UserProfile />
                </Col>
              </Row>
            </div>
          )}
        </Content>
        <Footer style={{ textAlign: 'right' }}>omnichem.ru 2024. All rights reserved.</Footer>
      </Layout>
    </Layout>
  );
};

const AccountWithCompanyProvider: React.FC = () => (
  <CompanyProvider>
    <Account />
  </CompanyProvider>
);

export default AccountWithCompanyProvider;
