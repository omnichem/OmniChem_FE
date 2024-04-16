import { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, CopyOutlined, HomeOutlined, BarChartOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import AnalyticsСontent from './components/analyticsСontent/AnalyticsСontent';
import TableSupplierCatalog from './components/TableSupplierCatalog/TableSupplierCatalog';
import axios from 'axios';
import CompanyCardForm from './components/companyCardForm/CompanyCardForm';
import { MenuInfo } from 'antd/lib/menu';

const { Header, Sider, Content } = Layout;

const SuppliersAccount: React.FC = () => {
  const [supplierMaterials, setSupplierMaterials] = useState<Material[]>([]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get('http://localhost:8000/API/v1/commerce/products/')
        .then(response => {
          if (response.data && Array.isArray(response.data.results)) {
            setSupplierMaterials(response.data.results);
          } else {
            console.error('Invalid response data format');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }, 3000);
  }, [supplierMaterials]);
  console.log(supplierMaterials);
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

  const onSelect = (info: MenuInfo) => {
    setCurrent(info.key as string);
  };

  interface Material {
    loading: boolean;
    id: string;
    distributor_id: string;
    product_name: string;
    manufacturer: string;
    article: string;
    availability_status: string;
    is_relationship: boolean;
    raw_material: string;
  }

  return (
    <>
      <Layout
        style={{
          height: '100vh',
        }}
      >
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
          <Menu onSelect={onSelect} theme="light" mode="inline" defaultSelectedKeys={['1']} items={items} />
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
                <CompanyCardForm />
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
                <AnalyticsСontent />
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
                  <Col xs={24} md={24}>
                    <TableSupplierCatalog
                      supplierMaterials={supplierMaterials.map((material: any) => ({
                        tags: true,
                        id: material.id,
                        distributor_id: material.distributor_id,
                        product_name: material.product_name,
                        manufacturer: material.manufacturer,
                        article: material.article,
                        availability_status: material.availability_status,
                        is_relationship: material.is_relationship,
                        raw_material: material.raw_material,
                      }))}
                      loading
                    />
                  </Col>
                </Row>
              </div>
            ) : null}
          </Content>
          <Footer
            style={{
              textAlign: 'right',
            }}
          >
            omnichem.ru 2024. All rights reserved.
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default SuppliersAccount;
