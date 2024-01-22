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

// export interface CollapseItems {
//   key: string;
//   label: string;
//   children: React.ReactNode;
// }

export interface Applications {
  key: string;
  value: string;
}

export enum InputStyle {
  DEFAULT,
  BORDERED,
}

interface AttributeValue {
  translated_value: string;
  value: string;
}

interface Attribute {
  attribute_name: string;
  translated_attribute_name: string;
  values: AttributeValue[];
}

export interface Material {
  id: number;
  value: string;
  is_supplier_available: boolean;
  attributes: Attribute[];
}

export interface MaterialResponse {
  count: number;
  next: string;
  previous: string;
  results: Material[];
}
