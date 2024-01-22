import React from "react";
import { styled } from "styled-components";

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <StyledHeader>
      <HeaderContainer>{children}</HeaderContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  height: auto;

  background-color: #ffffff;
  /* box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6); */
  border-bottom: 1px solid rgb(222, 222, 222);

  margin-bottom: 30px;
`;

export const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 1440px;

  @media (min-width: 320px) and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    max-width: 310px;
    padding: 10px 0 10px 0;

    box-sizing: border-box;
  }

  @media (min-width: 992px) {
    display: flex;
    flex-direction: row;
    gap: 100px;
    padding: 20px 0 20px 0;

    box-sizing: border-box;
  }
`;

export default Header;
