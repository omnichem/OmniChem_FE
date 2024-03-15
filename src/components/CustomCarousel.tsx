import React from 'react';
import { Carousel } from 'antd';
import { CustomButton } from './CustomButton';
import styled from 'styled-components';

interface CustomCarouselProps {
  children: React.ReactNode;
  slidesToShow: number;
}

const SampleNextArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: 'black',
        fontSize: '15px',
        lineHeight: '1.5715',
        zIndex: '10',
      }}
      onClick={onClick}
    >
      <CustomButton type="primary" text=">" />
    </div>
  );
};

const SamplePrevArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: 'black',
        fontSize: '15px',
        lineHeight: '1.5715',
        zIndex: '10',
      }}
      onClick={onClick}
    >
      <CustomButton type="primary" text="<" />
    </div>
  );
};

const settings = {
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

export const CustomCarousel: React.FC<CustomCarouselProps> = ({ children, slidesToShow }) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <StyledCarousel
      dots={false}
      arrows
      {...settings}
      slidesToShow={slidesToShow}
      afterChange={onChange}
      autoplay={true}
    >
      {children}
    </StyledCarousel>
  );
};

const StyledCarousel = styled(Carousel)``;
