export type UserValue = {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  accessedAt: string;
  email: string;
  emailVerification: boolean;
  labels: never[];
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: object;
  registration: string;
  status: boolean;
};

export type AuthContextType = {
  user?: UserValue | null;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  createAccount: (email: string, password: string, name: string) => void;
};
