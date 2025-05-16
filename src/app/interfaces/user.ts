export interface User {
  id: number;
  username: string;
  phone: string;
  email: string;
  status: number;
  password?: string;
  remember_token?: string;
}