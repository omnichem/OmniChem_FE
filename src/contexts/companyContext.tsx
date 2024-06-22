import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { http } from '../shared/const/http';
import axios from 'axios';

type CompanyContextType = {
  registerCompany: (companyData: { inn: string; companyType: string; companyName: string; address: string }) => void;
  registerError: { [key: string]: string[] } | null;
  isLoading: boolean;
};

const CompanyContext = createContext<CompanyContextType | null>(null);

export const useCompany = () => {
  const context = useContext<CompanyContextType | null>(CompanyContext);

  if (!context) {
    throw new Error('No company provider');
  }

  return context;
};

export const CompanyProvider = ({ children }: PropsWithChildren) => {
  const [registerError, setRegisterError] = useState<{ [key: string]: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerCompany = useCallback(async (companyData: any) => {
    try {
      setIsLoading(true);
      const response = await http.post('/api/company/register/', companyData);
      console.log('Company registration response:', response);
      setRegisterError(null);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            setRegisterError(error.response?.data);
            console.error(error.response?.data);
          }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CompanyContext.Provider value={{ registerCompany, registerError, isLoading }}>
      {children}
    </CompanyContext.Provider>
  );
};
