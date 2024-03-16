import React from 'react';
import { Button, Popover } from 'antd';
const content = (
  <div>
    <p>Сайт в ремонте</p>

  </div>
);
const Popover = ({content}) => (
  <Popover content={content} title="Title">
    <Button type="primary"></Button>
  </Popover>
);
export default Popover;