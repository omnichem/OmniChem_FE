import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { http } from '../shared/const/http';
import axios from 'axios';

type CompanyData = {
  inn: string;
  companyType: string;
  companyName: string;
  address: string;
  position: string;
};

type CompanyContextType = {
  registerCompany: (companyData: CompanyData) => void;
  updateCompany: (id: number, companyData: CompanyData) => void;
  fetchUserData: () => Promise<void>;
  userCompanies: any[];
  companyContextError: { [key: string]: string[] } | null;
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

const mapCompanyDataToBackend = (companyData: CompanyData) => {
  return {
    company_name: companyData.companyName,
    company_type: companyData.companyType,
    inn: companyData.inn,
    address: companyData.address,
    position: companyData.position,
  };
};

export const CompanyProvider = ({ children }: PropsWithChildren) => {
  const [companyContextError, setCompanyContextError] = useState<{ [key: string]: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userCompanies, setUserCompanies] = useState<any[]>([]);

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await http.get('/api/auth/users/me/');
      setUserCompanies(response.data.admin_companies);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const registerCompany = useCallback(async (companyData: CompanyData) => {
    try {
      setIsLoading(true);
      const data = mapCompanyDataToBackend(companyData);
      await http.post('/api/companies/', data);
      setCompanyContextError(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setCompanyContextError(error.response?.data);
        console.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCompany = useCallback(async (id: number, companyData: CompanyData) => {
    try {
      setIsLoading(true);
      const data = mapCompanyDataToBackend(companyData);
      await http.put(`/api/companies/${id}/`, data);
      setCompanyContextError(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setCompanyContextError(error.response?.data);
        console.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CompanyContext.Provider value={{ registerCompany, updateCompany, fetchUserData, userCompanies, companyContextError, isLoading }}>
      {children}
    </CompanyContext.Provider>
  );
};
