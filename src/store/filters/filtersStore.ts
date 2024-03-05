import { createStore, applyMiddleware, combineReducers } from "redux";
import { filtersReducer } from "./filtersReducer"
// import {composeWithDevTools} from "redux-devtools-extension";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
  filters: filtersReducer,
});

export const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware())
);

export type Store = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<Store> = useSelector;
