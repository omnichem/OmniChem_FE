import { Action, FilterState } from './types';

const initialState: FilterState = {
  filters: [],
};

export function filtersReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'SAVE_FILTERS':
      return { ...state, products: [...state.filters, ...action.payload] };

    default:
      return state;
  }
}
