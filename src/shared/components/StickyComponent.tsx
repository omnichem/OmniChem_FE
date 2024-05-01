import { Flex } from 'antd';
import React, { useEffect, useState } from 'react';
import { css, styled } from 'styled-components';

enum StickyComponentStyle {
  'STICKY',
  'NOT_STICKY',
}

interface StickyComponentProps {
  children: React.ReactNode;
}

export const StickyComponent: React.FC<StickyComponentProps> = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 61) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <StyledStickyComponent
      style={{ top: `${top}px` }}
      align="center"
      justify="center"
      $styleType={isSticky ? StickyComponentStyle.STICKY : StickyComponentStyle.NOT_STICKY}
    >
      {children}
    </StyledStickyComponent>
  );
};

const StyledStickyComponent = styled(Flex)<{
  $styleType: StickyComponentStyle;
}>`
  width: 100%;
  ${({ $styleType }) => {
    switch ($styleType) {
      case StickyComponentStyle.STICKY:
        return css`
          background-color: brown;
          top: 0;
          position: sticky;
          z-index: 10;
          box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12),
            0 5px 12px 4px rgba(0, 0, 0, 0.09);
        `;
      case StickyComponentStyle.NOT_STICKY:
        return css``;
    }
  }}
`;
