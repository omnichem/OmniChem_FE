import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomButton } from '../CustomButton';
import { CardStyle, CardWrapperStyle } from '../../types/componentsTypes';
import { CardInfo } from './CardInfo';
import fireIcon from './fire2.png';
import { Popover } from 'antd';
import { CardAttributes } from '../../types/pagesTypes';
import CardWrapper from './CardWrapper';

interface MaterialCardProps {
  id: number;
  name: string;
  translated_description: string;
  is_supplier_available: boolean;
  attributes: CardAttributes[];
  manufacturerImage?: string;
  manufacturerIcon?: string;
  loadingStyleType: CardWrapperStyle;
  onCardClick: (id: number) => void;
  link: string;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  name,
  translated_description,
  is_supplier_available,
  attributes,
  manufacturerIcon,
  manufacturerImage,
  id,
  onCardClick,
  link,
  loadingStyleType = CardWrapperStyle.LOADED,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [styleType, setStyleType] = useState<CardStyle>(CardStyle.UN_WRAP);

  function clickButton() {
    if (styleType === CardStyle.ROLL_UP) {
      setStyleType(CardStyle.UN_WRAP);
      setIsOpen(!isOpen);
    } else {
      setStyleType(CardStyle.ROLL_UP);
      setIsOpen(!isOpen);
    }
  }
  const onClick = () => {
    onCardClick(id);
  };

  return (
    <CardWrapper loadingStyleType={loadingStyleType}>
      <StyledCard onClick={onClick}>
        <CardHeader>
          <ManufacturerImage>{manufacturerImage}</ManufacturerImage>
          <ManufacturerIcon>{manufacturerIcon}</ManufacturerIcon>
        </CardHeader>
        <CardInfo styleType={styleType}>
          <MaterialName>{name}</MaterialName>
          {attributes.map(attribute => (
            <div>
              <MaterialAttributeName>{attribute.attribute_name}</MaterialAttributeName>
              <MaterialAttributeValue>
                {attribute.attribute_values.map(value => (
                  <span>{value}</span>
                ))}
              </MaterialAttributeValue>
            </div>
          ))}
          <MaterialAttributeValue>{translated_description}</MaterialAttributeValue>
        </CardInfo>
      </StyledCard>
      <CardFooter>
        <LinkContainer>
          <Link href={link}>Посмотреть сырье </Link>
          {is_supplier_available ? (
            <FireIcon>
              <Popover content="У этого сырья есть поставщик!">
                <img src={fireIcon} alt="" />
              </Popover>
            </FireIcon>
          ) : (
            <FireIcon></FireIcon>
          )}
        </LinkContainer>

        {isOpen ? (
          <CustomButton type="default" text={'Закрыть описание'} onClick={clickButton} style={{ width: '100%' }} />
        ) : (
          <CustomButton type="default" text={'Открыть описание'} onClick={clickButton} style={{ width: '100%' }} />
        )}
      </CardFooter>
    </CardWrapper>
  );
};

const MaterialAttributeName = styled.p`
  color: #505050;
  font-weight: 700;
`;
const MaterialAttributeValue = styled.p`
  color: #505050;
`;
const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const FireIcon = styled.div`
  height: 24px;
  width: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// const CardWrapper = styled.div`
//   box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.2);
//   border-radius: 5px;
//   overflow: hidden;

//   &:hover > div {
//     background-color: rgb(244, 244, 244);
//     transition: 1s;
//   }

//   &:not(:hover) > div {
//     background-color: rgb(8, 7, 7);
//     transition: 1s;
//   }
// `;

const StyledCard = styled.div`
  height: auto;
  max-width: 470px;
  background-color: #ffffff;

  cursor: pointer;
`;

const CardHeader = styled.div`
  height: 120px;
  position: relative;
`;

const ManufacturerImage = styled.div`
  width: 100%;
  height: 90px;

  border-radius: 5px 5px 0 0;
  background-color: #00a99d;
`;

const ManufacturerIcon = styled.div`
  width: 100px;
  height: 100px;

  position: absolute;
  top: 20px;
  left: 20px;

  /* background-color: #383a3b; */
  clip-path: path(
    'M 85.9033 94.638 C 61.0345 96.4547 36.1656 96.4547 11.2998 94.638 C 6.5484 94.2765 2.32561 90.0538 1.96409 85.3026 C 0.147385 60.4345 0.147385 35.5665 1.96409 10.7014 C 2.32561 5.94714 6.5484 1.72448 11.2998 1.36298 C 36.1687 -0.453675 61.0375 -0.453675 85.9033 1.36298 C 90.6547 1.72448 94.8775 5.94714 95.239 10.6984 C 97.0557 35.5665 97.0557 60.4345 95.239 85.2996 C 94.8805 90.0508 90.6547 94.2765 85.9033 94.638 Z'
  );
`;

const MaterialName = styled.p`
  color: #222c2e;
  margin: 0;

  font-size: 16px;
  font-weight: 700;
  line-height: 1.375;
  letter-spacing: 0px;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: center;

  padding: 20px;

  background-color: #ffffff;
`;

const Link = styled.a`
  text-decoration: none;
  color: #6386a5;
  &:visited {
    color: #383a3b;
  }
`;
