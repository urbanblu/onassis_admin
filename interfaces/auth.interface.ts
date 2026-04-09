import { IUser } from "./user.interface";

export interface IAuth {
  access: string;
  refresh: string;
  user?: IUser;
}

export interface ILogInRequest {
  email: string;
  password: string;
}
