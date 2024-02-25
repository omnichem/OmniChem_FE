import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react'
import styled from 'styled-components'

interface FilterItemProps {
  text: string;
  onChange: (e: CheckboxChangeEvent) => void;
  filterCategory: string;
}

export const FilterItem: React.FC<FilterItemProps> = ({ text, onChange, filterCategory }) => {
  return (
    <StyledItem>
      <Checkbox value={filterCategory.concat("=").concat(text)} onChange={onChange} />{text}</StyledItem>
  )
}

const StyledItem = styled.div`
  width: 100%;

  box-sizing: border-box;

  padding: 5px;

  display: flex;
  flex-direction: row;
  gap: 10px;
`

