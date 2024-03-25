import { AxiosResponse } from "axios";
import { http } from "../const/http";
import { authResponse } from "../models/authResponse";

export default class authService {
  static async login(email: string, password: string):Promise<AxiosResponse<authResponse>> {
    return http.post<authResponse>('/API/v1/commerce/auth/token/login/', {email, password})
  }

  static async register(email: string, password: string):Promise<AxiosResponse<authResponse>> {
    return http.post<authResponse>('/API/v1/commerce/auth/users/', {email, password})
  }

  static async logout():Promise<void> {
    return http.post('/API/v1/commerce/auth/token/logout/')
  }
}