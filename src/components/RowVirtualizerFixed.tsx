
import { useVirtualizer } from "@tanstack/react-virtual";
import { Checkbox, Divider } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useRef } from "react";

interface RowVirtualizerProps {
  data: string[];
  text?: string;
  onChange: (e: CheckboxChangeEvent) => void;
  filterCategory: string;
}

export const RowVirtualizerFixed: React.FC<RowVirtualizerProps> = ({ data, onChange, filterCategory, text }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 74,
    overscan: 5,
  });

  return (
    <div style={{ height: "100%" }}>
      <div
        ref={parentRef}
        style={{
          height: `100%`,
          width: `100%`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            position: "relative",
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow, i) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
              ref={virtualizer.measureElement}
            >
              <div >
                <div style={{ padding: "10px", display: "flex", flexDirection: "row", gap: "15px" }}>{data[virtualRow.index]}</div>
                <Divider style={{ margin: 0 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
