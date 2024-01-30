export enum CardStyle {
  ROLL_UP,
  UN_WRAP,
}

export enum ButtonStyle {
  ROUND,
  GRAY,
  BLUE,
  DEFAULT,
}

export enum InputStyle {
  DEFAULT,
  BORDERED,
}

export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
