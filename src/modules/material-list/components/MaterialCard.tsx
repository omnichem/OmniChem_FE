import { Divider, Popover, Card, Skeleton } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { CustomButton } from '../../../shared/components';
import { CardLogo } from '../../../shared/components/MaterialCard/CardLogo';
import { CardAttributes, Company } from '../../../shared/types/pagesTypes';

const tabList = [
  {
    key: 'tab1',
    tab: 'Свойства',
  },
  {
    key: 'tab2',
    tab: 'Описание',
  },
];

const MaterialName = styled.p`
  color: #222c2e;
  margin: 0;

  font-size: 18px;
  font-weight: 700;
  line-height: 1.375;
  letter-spacing: 0px;
`;

interface CardHeaderProps {
  manufacturerImage: string;
  manufacturerIcon: string;
  manufacturerName: string;
  isLoading: boolean;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  manufacturerIcon,
  // manufacturerImage,
  isLoading,
  manufacturerName,
}) => {
  if (!manufacturerIcon) {
    return (
      <StyledCardHeader>
        <ManufacturerImage>{/* <img src={manufacturerImage} /> */}</ManufacturerImage>
        <ManufacturerIcon
          style={{
            boxShadow:
              '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
          }}
        >
          <Skeleton.Image />
        </ManufacturerIcon>
      </StyledCardHeader>
    );
  }

  return (
    <StyledCardHeader>
      <ManufacturerImage>{/* <img src={manufacturerImage} /> */}</ManufacturerImage>
      <ManufacturerIcon
        style={{
          boxShadow:
            '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
        }}
      >
        {isLoading ? (
          <Skeleton.Image active={true} />
        ) : (
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            src={manufacturerIcon}
            alt={manufacturerName}
          />
        )}
      </ManufacturerIcon>
    </StyledCardHeader>
  );
};

interface MaterialCard2Props {
  clickButton: (id: number) => void;
  materialName: string;
  translated_description: string;
  attributes: CardAttributes[];
  id: number;
  loading: boolean;
  is_supplier_available: boolean;
  company: Company;
}

export const MaterialCard: React.FC<MaterialCard2Props> = ({
  is_supplier_available,
  clickButton,
  id,
  loading,
  materialName,
  translated_description,
  attributes,
  company,
}) => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
  const { name, logo } = company;
  const onClick = () => {
    clickButton(id);
  };

  const contentList: Record<string, React.ReactNode> = {
    tab1: (
      <Tab1ContentWrapper>
        <MaterialName>{materialName}</MaterialName>
        <MaterialName>{name}</MaterialName>
        <Divider style={{ margin: 0 }} />
        {attributes.map(attribute => (
          <div key={attribute.attribute_name}>
            <MaterialAttributeName>{attribute.attribute_name}:</MaterialAttributeName>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
              <MaterialAttributeValue>
                {attribute.attribute_values.map((value, index) => {
                  if (index === attribute.attribute_values.length - 1) {
                    return value;
                  } else {
                    return value.concat(' / ');
                  }
                })}
              </MaterialAttributeValue>
            </div>

            {/* <Divider/> */}
          </div>
        ))}
      </Tab1ContentWrapper>
    ),
    tab2: (
      <Tab2ContentWrapper>
        <div>
          <MaterialAttributeValue>{translated_description}</MaterialAttributeValue>
        </div>
      </Tab2ContentWrapper>
    ),
  };

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return (
    <>
      <StyledCard
        onClick={onClick}
        tabBarExtraContent={
          is_supplier_available ? (
            <Popover
              content={
                <div>
                  "У этого сырья есть поставщик!"
                  <br />
                  Напишите в чат: <a href="https://t.me/omnichem">OmniChem</a>
                </div>
              }
            >
              <div>
                <CardLogo width={40} height={40} />
              </div>
            </Popover>
          ) : (
            <></>
          )
        }
        loading={loading}
        title={<CardHeader manufacturerName={name} isLoading={loading} manufacturerIcon={logo} manufacturerImage="" />}
        style={{ width: '100%' }}
        // extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
        hoverable
      >
        <CardContentWrapper>
          {contentList[activeTabKey1]}
          <CustomButton type="default" text={'Подробнее'} onClick={onClick} style={{ width: '100%' }} />
        </CardContentWrapper>
      </StyledCard>
    </>
  );
};

const CardContentWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
`;

const Tab1ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const Tab2ContentWrapper = styled.div`
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MaterialAttributeName = styled.p`
  color: #505050;
  font-weight: 700;
`;
const MaterialAttributeValue = styled.p`
  color: #505050;
`;

const StyledCard = styled(Card)`
  /* border-radius: 4px; */
  min-width: 320px;
  width: 100%;
  height: 500px;
  border: none;
  overflow: hidden;
  &:hover {
    border: none;
  }
  outline: 1px solid rgba(5, 5, 5, 0.06);

  .ant-card-body {
    padding: 20px;
    height: 324px;
    display: flex;
  }
`;
const StyledCardHeader = styled.div`
  height: 120px;
  position: relative;
`;

const ManufacturerImage = styled.div`
  width: 100%;
  height: 90px;

  background-color: #00a99d;
`;

const ManufacturerIcon = styled.div`
  width: 100px;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 20px;
  left: 20px;

  border-radius: 8px 8px 0 0;
  overflow: hidden;

  background-color: #ffffff;
  box-sizing: border-box;
  /* background-color: #383a3b; */
  /* border: 1px solid #383a3b; */

  /* clip-path: path(
    'M 85.9033 94.638 C 61.0345 96.4547 36.1656 96.4547 11.2998 94.638 C 6.5484 94.2765 2.32561 90.0538 1.96409 85.3026 C 0.147385 60.4345 0.147385 35.5665 1.96409 10.7014 C 2.32561 5.94714 6.5484 1.72448 11.2998 1.36298 C 36.1687 -0.453675 61.0375 -0.453675 85.9033 1.36298 C 90.6547 1.72448 94.8775 5.94714 95.239 10.6984 C 97.0557 35.5665 97.0557 60.4345 95.239 85.2996 C 94.8805 90.0508 90.6547 94.2765 85.9033 94.638 Z'
  ); */
`;
