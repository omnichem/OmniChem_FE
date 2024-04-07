import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import { PersistedKey } from '../shared/const/persistedKey';

type GlobalSearchContextType = [value: string, setValue: Dispatch<SetStateAction<string>>];

const GlobalSearchContext = createContext<GlobalSearchContextType | null>(null);

export const useGlobalSearch = () => {
  const context = useContext<GlobalSearchContextType | null>(GlobalSearchContext);

  if (!context) {
    throw Error('No global search provider');
  }

  return context;
};

export const GlobalSearchProvider = ({ children }: PropsWithChildren) => {
  const state = useState<string>(() => {
    const target = sessionStorage.getItem(PersistedKey.SearchMaterial);
    if (!target) {
      sessionStorage.setItem(PersistedKey.SearchMaterial, '');
      return '';
    }
    return '';
  });

  return <GlobalSearchContext.Provider value={state}>{children}</GlobalSearchContext.Provider>;
};
