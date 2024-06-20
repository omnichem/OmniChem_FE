export interface CardAttributes {
  attribute_name: string;
  attribute_values: string[];
}

export interface Company {
  name: string;
  logo: string;
}

export interface CardMaterial {
  id: number;
  name: string;
  translated_description: string;
  company: Company;
  is_supplier_available: boolean;
  attributes: CardAttributes[];
}

// карточки
export interface CardMaterialResponse {
  count: number;
  next: string;
  previous: string;
  results: CardMaterial[];
}

// описание сырья

export interface MaterialPageAttributes {
  attribute_name: string;
  attribute_values: string[];
}

export interface MaterialTableRows {
  field_name: string;
  field_value: string;
  units: string;
  test_method: null;
}

export interface MaterialTable {
  table_name: null;
  table_rows: MaterialTableRows[];
}

export interface Document {
  name: string;
  doc_type: string;
  document: string;
}

export interface CompanyTitle {
  logo: unknown;
  name: string;
}

export interface MaterialPageType {
  id: number;
  name: string;
  translated_description: string;
  is_supplier_available: boolean;
  company: CompanyTitle;
  brand: string;
  attributes: MaterialPageAttributes[];
  tables: MaterialTable[];
  documents: Document[];
}

export interface PageSize {
  pageSize: 8 | 16 | 24;
}

// Фильтры
export interface Filter {
  translated_name: string;
  attribute_values: string[];
}
