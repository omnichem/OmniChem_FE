import { Card, Checkbox, Divider } from 'antd'
import React from 'react'
import { styled } from 'styled-components'

interface FilterItemProps {
  children: React.ReactNode
  data: string[];
  text?: string;
  onChange: (e: CheckboxChangeEvent) => void;
  filterCategory: string;
}


export const FilterItem: React.FC<FilterItemProps> = ({ children, data, text, onChange, filterCategory }) => {
  return (
    <FiltersWrapper >
      <div >
        <div style={{ padding: "10px 10px 10px 0", display: "flex", flexDirection: "row", gap: "15px" }}><Checkbox value={filterCategory.concat("=").concat(data[virtualRow.index])} onChange={onChange} />{data[virtualRow.index]}</div>
        <Divider style={{ margin: 0 }} />
      </div>
    </FiltersWrapper>
  )
}

const FiltersWrapper = styled.div`
  /* background-color: #535353; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;

  box-sizing: border-box;

  border-radius: 10px;
  width: 100%;
  max-width: 300px;
  height: auto;
`

