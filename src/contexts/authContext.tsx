import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { http } from '../shared/const/http';
import { UserResponse } from '../shared/types/user';

type AuthContextType = {
  token: string | undefined;
  isAuthorized: boolean;
  login: (email: string, password: string) => void;
  logOut: () => void;
  isLoading: boolean;
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
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const login = useCallback((email: string, password: string) => {
    const innerLogin = async () => {
      try {
        setIsLoading(true);
        await http
          .post<UserResponse>('/API/v1/commerce/auth/token/login/', {
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
            console.log(error);
          });
      } catch (error) {
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };
    innerLogin();
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
    <AuthContext.Provider value={{ token, isAuthorized, isLoading, login, logOut }}>{children}</AuthContext.Provider>
  );
};
