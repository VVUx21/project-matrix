import { User } from "../user";

export interface AuthContextType {
  user: User | null;
  error: string;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  createAccount: (
    email: string,
    password: string,
    name: string
  ) => Promise<boolean>;
  logout: () => Promise<boolean>;
}
