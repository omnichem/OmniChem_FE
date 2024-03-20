import React from 'react'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const PickerDate = () => {
  return (
    <div className='PickerDate'>
      <span>Период с</span>
      <Space direction="vertical" size={14}>
        <RangePicker />
      </Space>
    </div>

  )};
export default PickerDate;
