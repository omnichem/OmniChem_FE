export interface UserLoginResponse {
  auth_token: string;
}

export interface UserRegisterResponse {
  email: string;
  password: string;
  confirmation: string;
  lastName: string;
  firstName: string;
  position: string;
}
export interface CompanyRegisterResponse {
  email: string;
  password: string;
  confirmation: string;
  lastName: string;
  firstName: string;
  position: string;
}
