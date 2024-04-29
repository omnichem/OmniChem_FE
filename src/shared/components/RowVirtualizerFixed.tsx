import { useVirtualizer } from '@tanstack/react-virtual';
import { Divider } from 'antd';

import { ReactElement, useDeferredValue, useMemo, useRef, useState } from 'react';
import { CustomInput } from '.';

interface RowVirtualizerProps {
  data: string[];
  itemRenderer: (data: string, index: number, dataCopy: string[]) => ReactElement;
}

export const RowVirtualizerFixed: React.FC<RowVirtualizerProps> = ({ data, itemRenderer }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const deferredSearch = useDeferredValue(searchFilter);
  const filteredData = useMemo(
    () => data.filter(item => item.toLowerCase().includes(deferredSearch.trim().toLowerCase())),
    [deferredSearch]
  );

  const virtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 74,
    overscan: 5,
  });
  console.log(2);
  return (
    <div style={{ height: '100%' }}>
      <div style={{ boxSizing: 'border-box', padding: '10px' }}>
        <CustomInput name="" placeholder="Введите название фильтра" value={searchFilter} onChange={setSearchFilter} />
      </div>
      <Divider style={{ margin: '0' }} />
      <div
        ref={parentRef}
        style={{
          height: `calc(100% - 51.33px)`,
          width: `100%`,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: '100%',
            position: 'relative',
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow, _) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
              ref={virtualizer.measureElement}
            >
              <div>
                {itemRenderer(filteredData[virtualRow.index], virtualRow.index, filteredData)}
                {/* <div style={{ padding: "10px", display: "flex", flexDirection: "row", gap: "15px" }}>{data[virtualRow.index]}</div> */}
                <Divider style={{ margin: 0 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
