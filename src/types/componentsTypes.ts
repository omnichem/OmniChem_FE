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
  value: string;
  unit: string;
  method: null;
}

export enum CardWrapperStyle {
  LOADED,
  LOADING
}
