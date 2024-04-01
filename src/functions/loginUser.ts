import { http } from "../const/http"
import { UserResponse } from "../types/user";

export const loginUser = async (email: string, password: string) => {
  try {
    await http
    .post<UserResponse>('/API/v1/commerce/auth/token/login/', {
      email: email,
      password: password,
    })
    .then(function (response) {
      localStorage.setItem('token', response.data.auth_token);
      // localStorage.setItem('token', response.data.auth_token);
      console.log(response, localStorage.getItem('token'));
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
  } catch (error) {
    return error
  }
}