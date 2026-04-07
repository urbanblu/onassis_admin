export type UserRole =
  | "superuser"
  | "operations_manager"
  | "director"
  | "executive_secretary"
  | "administrator"
  | "finance_manager";

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_type: string;
  role: UserRole;
  created_at: string;
}
