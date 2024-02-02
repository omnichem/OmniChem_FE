export interface Applications {
  key: string;
  value: string;
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


// карточки
export interface MaterialResponse {
  count: number;
  next: string;
  previous: string;
  results: Material[];
}


// описание сырья


export interface MaterialPageAttributes {
  attribute_name: string,
      attribute_values: string[]
}

export interface MaterialTableRows {
      field_name: string;
      field_value: string;
      units: string;
      test_method: null;
    
}

export interface MaterialTable {
      table_name: null,
      table_rows: MaterialTableRows[]
}

export interface MaterialPageType {
  id: number;
  name: string;
  translated_description: string;
  is_supplier_available: boolean;
  company: string;
  brand: string;
  attributes: MaterialPageAttributes[]
  tables: MaterialTable[]
}

export interface PageSize {
  pageSize: 8 | 16 | 24 
  }