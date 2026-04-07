import { User } from "./user.interface";

export interface IAuth {
  access: string;
  refresh: string;
  user?: User;
}

export interface ILogInRequest {
  email: string;
  password: string;
}
