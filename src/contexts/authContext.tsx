import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { http } from '../shared/const/http';
import { UserLoginResponse, UserRegisterResponse } from '../shared/types/user';

type AuthContextType = {
  token: string | undefined;
  isAuthorized: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logOut: () => void;
  isLoading: boolean;
  loginError: string[] | undefined;
  registerError: string[] | undefined;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext<AuthContextType | null>(AuthContext);

  if (!context) {
    throw Error('No auth provider');
  }

  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | undefined>(() => {
    const targetToken = localStorage.getItem('token');
    if (targetToken) return targetToken;
  });
  const [loginError, setLoginError] = useState();
  const [registerError, setRegisterError] = useState();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const login = useCallback((email: string, password: string) => {
    const innerLogin = async () => {
      try {
        setIsLoading(true);
        await http
          .post<UserLoginResponse>('/API/v1/commerce/auth/token/login/', {
            email,
            password,
          })
          .then(function (response) {
            localStorage.setItem('token', response.data.auth_token);
            // localStorage.setItem('token', response.data.auth_token);
            setToken(response.data.auth_token);
            setIsAuthorized(true);
            console.log(response, localStorage.getItem('token'));
          })
          .catch(function (error) {
            setIsAuthorized(false);
            console.log(error.response.data.non_field_errors);
            setLoginError(error.response.data.non_field_errors);
          });
      } catch (error) {
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };
    innerLogin();
  }, []);
  const register = useCallback((email: string, password: string) => {
    const innerRegister = async () => {
      try {
        setIsLoading(true);
        await http
          .post<UserRegisterResponse>('/API/v1/commerce/auth/users/', {
            email,
            password,
          })
          .catch(function (error) {
            console.log(error.response.data);
            setRegisterError(error.response.data);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    innerRegister();
    console.log(innerRegister);
  }, []);
  const logOut = useCallback(() => {
    const innerLogOut = async () => {
      try {
        setIsLoading(true);
        await http.post(
          '/API/v1/commerce/auth/token/logout/',
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      } finally {
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));
        setToken(undefined);
        setIsAuthorized(false);
        setIsLoading(false);
      }
    };
    innerLogOut();
  }, []);
  // useEffect(() => {
  //   if (!token) return;
  // }, []);
  return (
    <AuthContext.Provider
      value={{ register, token, isAuthorized, isLoading, login, logOut, loginError, registerError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
