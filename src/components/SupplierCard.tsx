import React from 'react';

import { CustomButton } from './CustomButton';

import { CollapseBlock } from './CollapseBlock';
import { Alert, CollapseProps, Flex } from 'antd';

import styled from 'styled-components';
import { CustomCard } from './MaterialCard/CustomCard';

interface MaterialCardProps {
  // items: CollapseProps['items'];
  cardTittle: string;
  sampleRequest: () => void;
  quoteRequest: () => void;
  informationRequest: () => void;
  availability: string;
}

export const SupplierCard: React.FC<MaterialCardProps> = ({
  cardTittle,
  sampleRequest,
  quoteRequest,
  informationRequest,
  availability,
}) => {
  return (
    <CustomCard>
      {/* <CollapseBlock collapsible={'disabled'} items={items} /> */}

      <Flex vertical gap={'middle'}>
        <Alert style={{ fontSize: '20px' }} message={cardTittle} />
        <div>
          {availability.length == 0 ? (
            <p>Не доступно для заказа</p>
          ) : (
            <p style={{ fontSize: '15px', color: '#505050' }}>Как купить: {availability}</p>
          )}
        </div>

        <RequestWrapper>
          <CustomButton type="default" text="Запросить ценовое предложение" onClick={quoteRequest} />
          <CustomButton type="primary" text="Запросить образец" onClick={sampleRequest} />
          <CustomButton type="text" text="Дополнительная информация" onClick={informationRequest} />
        </RequestWrapper>
      </Flex>
    </CustomCard>
  );
};

const RequestWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;

  width: 100%;
`;

export default SupplierCard;
