export interface UserLoginResponse {
  access: string;
  refresh: string;
}

export interface UserRegisterResponse {
  email: string;
  password: string;
}
export interface CompanyRegisterResponse {
  email: string;
  password: string;
  confirmation: string;
  lastName: string;
  firstName: string;
  position: string;
}
