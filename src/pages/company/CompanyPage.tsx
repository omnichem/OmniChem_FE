import { useCallback, useState } from 'react';
import { RegCompanyForm } from '../../modules/auth/components/CompanyForm';
import { http } from '../../shared/const/http';
import { CompanyRegisterResponse } from '../../shared/types/user';

const CompanyPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerCompanyError, setRegisterCompanyError] = useState();

  const registerCompany = useCallback(
    (inn: string, company_type: string, company_name: string, markets: string, address: string) => {
      const innerRegisterCompany = async () => {
        try {
          await http
            .post<CompanyRegisterResponse>('/API/auth/registration/', {
              inn,
              company_type,
              company_name,
              markets,
              address,
            })
            .catch(function (error) {
              console.log(error.response.data);
              setRegisterCompanyError(error.response.data);
            });
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      innerRegisterCompany();
    },
    []
  );

  return (
    <div>
      AuthFormWrapper
      <RegCompanyForm />
      <AuthContext.Provider value={{ registerCompany, isLoading, registerCompanyError }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default CompanyPage;
