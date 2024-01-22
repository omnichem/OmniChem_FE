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

interface Values {
  attribute_name: string;
  translated_attribute_name: string;
  values: AttributeValue[];
}

export interface Material {
  id: number;
  value: string;
  is_supplier_available: boolean;
  first_filter: string;
  second_filter: string;
  third_filter: string;
  brand: unknown;
  company: string;
  values: Values[];
}

export interface MaterialResponse {
  count: number;
  next: string;
  previous: string;
  results: Material[];
}

export interface MaterialPageAttributesValues {
  translated_value: string;
  value: string;
}

export interface MaterialPageAttributes {
  attribute_name: string;
  translated_attribute_name: string;
  units: unknown;
  test_method_conditions: unknown;
  attribute_type: string;
  page_placement: string;
  values: MaterialPageAttributesValues[];
}

export interface MaterialPageType {
  id: number;
  value: string;
  is_supplier_available: boolean;
  irst_filter: string;
  second_filter: string;
  hird_filter: string;
  brand: unknown;
  company: string;
  attributes: MaterialPageAttributes[];
}
