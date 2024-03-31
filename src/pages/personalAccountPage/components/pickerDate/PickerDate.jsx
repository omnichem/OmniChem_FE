import React from 'react'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const PickerDate = () => {
  return (
    <div className='PickerDate'>
      <Space direction="horizontal" size={14} align="center">
        <span className='periodTxt'>Период с</span>
        <RangePicker />
      </Space>
    </div>
  );
};

export default PickerDate;
