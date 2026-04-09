import type { IPaginatedResults } from "./writers.interface";

export interface IAdminUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  role: string;
  is_active: boolean;
  photo: string | null;
  date_joined?: string;
}

export interface ICreateAdminUserPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  photo?: File;
}

export interface IEditAdminUserPayload {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  is_active?: boolean;
  photo?: File;
}

export interface IActivityLog {
  id: number;
  actor_name: string;
  actor_email: string;
  action: "login" | "create_admin" | "edit_admin";
  description: string;
  created_at: string;
}

export type IAdminUsersResponse = IPaginatedResults<IAdminUser>;
export type IActivityLogsResponse = IPaginatedResults<IActivityLog>;
