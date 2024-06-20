import { createContext, PropsWithChildren, SetStateAction, useCallback, useContext, useState, useEffect } from 'react';
import { http } from '../shared/const/http';
import { UserLoginResponse, UserRegisterResponse } from '../shared/types/user';
import { ResponseCodeType } from '../shared/types/authResponse';
import { getCookie, removeCookie } from '../shared/utils';

const authCoockieName = 'refresh_token_present';
const accessTokenKey = 'token';

type AuthContextType = {
  token: string | undefined;
  isAuthorized: boolean;
  responseCode: SetStateAction<ResponseCodeType | undefined>;
  login: (email: string, password: string) => void;
  register: (
    email: string,
    password: string,
  ) => void;
  logOut: () => void;
  isLoading: boolean;
  loginError: boolean;
  registerError: { [key: string]: string[] };
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
    const targetToken = localStorage.getItem(accessTokenKey);
    if (targetToken) return targetToken;
  });
  const [loginError, setLoginError] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<{ [key: string]: string[] }>({});
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => !!getCookie(authCoockieName));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseCode, setResponseCode] = useState<ResponseCodeType | undefined>(undefined);

  useEffect(() => {
    const refreshTokenPresent = getCookie(authCoockieName);
    if (refreshTokenPresent) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const login = useCallback((email: string, password: string) => {
    const innerLogin = async () => {
      try {
        setIsLoading(true);
        await http
          .post<UserLoginResponse>('/api/auth/jwt/create/', {
            email,
            password,
          })
          .then(function (response) {
            localStorage.setItem(accessTokenKey, response.data.access);
            setToken(response.data.access);
            setIsAuthorized(true);
            console.log(response, localStorage.getItem(accessTokenKey));
          })
          .catch(function (error) {
            setIsAuthorized(false);
            console.log(error.response.data.non_field_errors);
            setLoginError(true);
          });
      } catch (error) {
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };
    innerLogin();
  }, []);

  const register = useCallback(
    (email: string, password: string) => {
      const innerRegister = async () => {
        try {
          setIsLoading(true);
          await http
            .post<UserRegisterResponse>('/api/auth/users/', {
              email,
              password,
            })
            .then(function (response) {
              setResponseCode(response.status);
              console.log('Ответ сервера', response);
              console.log('Статус:', response.status);
              console.log('statusText', response.statusText);
            })
            .catch(function (error) {
              setResponseCode(error.response.status);
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
    },
    []
  );

  const logOut = useCallback(() => {
    const innerLogOut = async () => {
      try {
        setIsLoading(true);
        await http.post('/API/v1/commerce/auth/token/logout/', {});
      } catch (error) {
        console.error(error);
      } finally {
        localStorage.removeItem(accessTokenKey);
        removeCookie(authCoockieName);
        setToken(undefined);
        setIsAuthorized(false);
        setIsLoading(false);
      }
    };
    innerLogOut();
  }, []);

  // Static method to log out the user from outside the component
  AuthProvider.logOut = logOut;

  return (
    <AuthContext.Provider
      value={{ register, token, isAuthorized, isLoading, login, logOut, loginError, registerError, responseCode }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.logOut = () => {};
