export enum AuthenticationMethod {
  VIA_FACENOTE = 'VIA_FACENOTE',
  VIA_ZUITER = 'VIA_ZUITER',
}

export interface LoginData {
  username: string;
  method: AuthenticationMethod;
}

export interface LoginResponse {
  status: boolean;
  message: string;
}
