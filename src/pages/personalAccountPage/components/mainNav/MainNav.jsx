import React, { useState } from 'react';
import { Radio, Tabs } from 'antd';


const MainNav = () => {
  const [mode, setMode] = useState('top');
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  return (
    <div>
      <Radio.Group
        onChange={handleModeChange}
        value={mode}
        style={{
          marginBottom: 8,
        }}
      >
        <Radio.Button value="top">Horizontal</Radio.Button>
        <Radio.Button value="left">Vertical</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        style={{
          height: 220,
        }}
        items={new Array(10).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            disabled: i === 10,
            children: `Content of tab ${id}`,
          };
        })}
      />
    </div>
  );
};
export default MainNav;
