import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import { PersistedKey } from '../shared/const/persistedKey';

type FilterContextType = [value: string[], setValue: Dispatch<SetStateAction<string[]>>];

const FilterContext = createContext<FilterContextType | null>(null);

export const useFilter = () => {
  const context = useContext<FilterContextType | null>(FilterContext);

  if (!context) {
    throw Error('No global filter provider');
  }

  return context;
};

export const GlobalFilterProvider = ({ children }: PropsWithChildren) => {
  const filter = useState<string[]>(() => {
    const target = sessionStorage.getItem(PersistedKey.Filter);
    if (!target) {
      sessionStorage.setItem(PersistedKey.Filter, JSON.stringify([]));
      return [];
    }
    return [];
  });

  return <FilterContext.Provider value={filter}>{children}</FilterContext.Provider>;
};
