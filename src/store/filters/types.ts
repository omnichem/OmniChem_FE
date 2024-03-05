export interface Filter {
  filter: string;
}

export interface FilterState {
  filters: Filter[];
}

export interface Action {
  type: string;
  payload: Filter[];
}