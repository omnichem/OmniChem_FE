import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import { PersistedKey } from '../shared/const/persistedKey';
import { PaginationProps } from 'antd';

type PaginationContextType = {
  page: number;
  pageSize: number;
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
  onChangePage: PaginationProps['onChange'];
  onChangeSizePage: PaginationProps['onShowSizeChange'];
};

const PaginationContext = createContext<PaginationContextType | null>(null);

export const usePagination = () => {
  const context = useContext<PaginationContextType | null>(PaginationContext);

  if (!context) {
    throw Error('No pagination provider');
  }

  return context;
};

export const PaginationProvider = ({ children }: PropsWithChildren) => {
  const [total, setTotal] = useState(50);
  const [page, setPage] = useState(() => {
    const target = sessionStorage.getItem(PersistedKey.Page);
    if (!target) {
      sessionStorage.setItem(PersistedKey.Page, '1');
      return 1;
    }
    return parseInt(target);
  });
  const [pageSize, setPageSize] = useState(() => {
    const target = sessionStorage.getItem(PersistedKey.PageSize);
    if (!target) {
      sessionStorage.setItem(PersistedKey.PageSize, '16');
      return 16;
    }
    return parseInt(target);
  });

  const onChangePage: PaginationProps['onChange'] = (page: number) => {
    setPage(page);
    sessionStorage.setItem(PersistedKey.Page, page.toString());
  };

  const onChangeSizePage: PaginationProps['onShowSizeChange'] = (_: number, size: number) => {
    setPageSize(size);
    sessionStorage.setItem(PersistedKey.PageSize, size.toString());
  };
  // useEffect(() => {
  //   if (!token) return;
  // }, []);
  return (
    <PaginationContext.Provider
      value={{ total, setTotal, page, setPage, pageSize, setPageSize, onChangePage, onChangeSizePage }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
