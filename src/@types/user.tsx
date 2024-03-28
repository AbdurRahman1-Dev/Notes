// import { Models } from "appwrite";

export type UserValue = {
  $createdAt?: string;
  $id?: string;
  $updatedAt?: string;
  accessedAt?: string;
  email?: string;
  emailVerification?: boolean;
  labels?: never[];
  name?: string;
  passwordUpdate?: string;
  phone?: string;
  phoneVerification?: boolean;
  prefs?: object;
  registration?: string;
  status?: boolean;
};

export type AuthContextType = {
  user?: UserValue | null;
  isLoading: boolean;
  login: (username: string, password: string) => object;
  logout: () => object;
  createAccount: (email: string, password: string, name: string) => object;
};

export type UserType = {
  user?: UserValue | null;
};

export type LoginType = {
  login: (username: string, password: string) => object;
};
export type IsLoadingType = {
  isLoading: boolean;
};

export type LogoutType = {
  logout: () => object;
};
export type CreateAccountType = {
  createAccount: (email: string, password: string, name: string) => object;
};
