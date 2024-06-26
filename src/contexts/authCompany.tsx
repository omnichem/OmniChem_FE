import { createContext, PropsWithChildren, SetStateAction, useCallback, useContext, useState } from 'react';
import { http } from '../shared/const/http';
import { UserLoginResponse, UserRegisterResponse } from '../shared/types/user';
import { ResponseCodeType } from '../shared/types/authResponse';

type AuthContextType = {
  registerCompany: (
    inn: string,
    company_type: string,
    company_name: string,
    address: string,
  ) => void;
  responseCode: SetStateAction<ResponseCodeType | undefined>;
};

  const registerCompany = useCallback(
    (inn: string, company_type: string, company_name: string, address: string) => {
      
      const innerRegister = async () => {
        try {

          await http
            .post<UserRegisterResponse>('/API/auth/registration/', {
              inn,
              company_type,
              company_name,
              address
            })
            .then(function (response) {
              setResponseCode(response.status);
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
      innerRegister();
    },
    []
  );

  
  return (
    <AuthContext.Provider
      value={{ registerCompany, registerCompanyError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
