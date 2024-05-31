export interface User {
  email: string;
}

export interface authResponse {
  auth_token: string;
}

export enum ResponseCodeType {
  SUCCESS = 201,
  BADREQUEST = 400,
  SERVERERROR = 500,
}
