import React from 'react';
import { Carousel } from 'antd';
import CustomButton from './CustomButton';
import styled from 'styled-components';

interface CustomCarouselProps {
  children: React.ReactNode;
  slidesToShow: number;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({children, slidesToShow}) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <StyledCarousel dots={false} arrows={true} prevArrow={<CustomButton text='<' type={'primary'}/>} nextArrow={<CustomButton text='>' type={'primary'}/>} slidesToShow={slidesToShow} afterChange={onChange} autoplay={true}>
      {children}
    </StyledCarousel>
  );
};

const StyledCarousel = styled(Carousel)`
  

`

export default CustomCarousel;