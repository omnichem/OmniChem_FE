import { Tag } from "antd";

export const customizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean }
) => (
  <>
    {required ? (
      <Tag color="error">Обязательно</Tag>
    ) : (
      <Tag color="warning">По желанию</Tag>
    )}
    {label}
  </>
);
