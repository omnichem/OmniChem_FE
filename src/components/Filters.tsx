import { Card } from 'antd'
import React from 'react'
import { styled } from 'styled-components'

interface FiltersProps {
  children: React.ReactNode
}

export const Filters: React.FC<FiltersProps> = ({ children }) => {
  return (
    <FiltersWrapper >
      {
        children
      }
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

