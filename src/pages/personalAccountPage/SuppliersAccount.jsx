import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CopyOutlined,
  HomeOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import AnalyticsСontent from './components/analyticsСontent/AnalyticsСontent'

import { Layout, Menu, Button, theme } from 'antd';
import CompanyCard from './components/companyCardForm/CompanyCardForm';

const { Header, Sider, Content, Footer } = Layout;

const SuppliersAccount = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [current, setCurrent] = useState("1");

  const [content, setContent] = useState('Нажми на кнопку')

  const navName = ['Компания', 'Аналитика', 'Каталог'];
  const items = [HomeOutlined , BarChartOutlined, CopyOutlined].map(
    (icon, index) => ({
      key: String(index + 1),
      icon: React.createElement(icon),
      label: navName[index],
    }),
  );

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  function HandleClick(type) {
    setContent(type)
  };

  return (
    <Layout  
    style={{
      height: '100vh'
    }}>
      <Sider trigger={null} collapsible collapsed={collapsed}
      style={{
        backgroundColor: '#f5f5f5',
        paddingTop: '15px',
        fontSize: '1rem'
      }}>
        <div className="demo-logo-vertical" />
        <Menu onClick={onClick}

          breakpoint="xl"
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
      <Layout breakpoint="xxl">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            fontSize: '1.875rem',
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
          /> {navName[parseInt(current) - 1]}
        </Header>
        
        <Content> 
        {
          current == "1" ? (
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <CompanyCard />
              
            </div>
          ) : current == "2" ? (
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
          ) : current == "3" ? (
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
            
            </div>
          ) : null
            }
        </Content>
        <Footer
          style={{
            textAlign: 'right',
          }}
        >
          omnichem.ru  2024. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
    
  );
};

export default SuppliersAccount;