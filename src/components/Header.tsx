import React from "react";
import { styled } from "styled-components";

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>;
};

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 20px;

  background-color: #ffffff;
  /* box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6); */
  border-bottom: 1px solid rgb(222, 222, 222);

  padding: 10px 200px 10px 200px;
  margin-bottom: 30px;
`;

export default Header;
