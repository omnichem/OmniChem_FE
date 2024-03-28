import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import './components/suppliersAccount/suppliersAccount.css';
import { MenuFoldOutlined, MenuUnfoldOutlined, CopyOutlined, HomeOutlined, BarChartOutlined } from '@ant-design/icons';
import AnalyticsСontent from './components/analyticsСontent/AnalyticsСontent';

import { Layout, Menu, Button, theme } from 'antd';
import CompanyCard from './components/companyCardForm/CompanyCardForm';
import TableSupplierCatalog from './components/TableSupplierCatalog/TableSupplierCatalog';
import { ThemConfig } from './Theme';

const { Header, Sider, Content, Footer } = Layout;

const SuppliersAccount = () => {
  const [supplierMaterials, setSupplierMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

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
      })
    }, "5000");
  }, [supplierMaterials]);
  console.log(supplierMaterials);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [current, setCurrent] = useState('1');

  const [content, setContent] = useState('Нажми на кнопку');

  const navName = ['Компания', 'Аналитика', 'Каталог'];
  const items = [HomeOutlined, BarChartOutlined, CopyOutlined].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: navName[index],
  }));

  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  function HandleClick(type) {
    setContent(type);
  }

  return (
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
        <Menu onClick={onClick} breakpoint="xl" theme="light" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout style={{ bodyBg: 'rgb(132, 36, 36)' }} breakpoint="xxl">
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
              fontSize: '1rem',
              width: 64,
              height: 64,
            }}
          />{' '}
          {navName[parseInt(current) - 1]}
        </Header>
        <Content>
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
              <CompanyCard />
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
              {/* <Testnew /> */}
              <Row>
                <Col xs={24} md={24}>
                  <TableSupplierCatalog 
                    supplierMaterials={supplierMaterials.map(material => {
                      const data = {
                        key: material.id,
                        ...material
                      };
                      return data;
                    })}
                    loading={loading}
                  />
                </Col>
              </Row>
            </div>
          ) : null}
        </Content>

        <Footer
          className="ant-footer"
          style={{
            textAlign: 'right',
            footerPadding: '20px 20px',
          }}
        >
          omnichem.ru 2024. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SuppliersAccount;
