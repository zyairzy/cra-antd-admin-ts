export interface User {
  id: string;
  createdTimestamp: number;
  updatedTimestamp: number;
  username: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
  email: string;
  validTo: number;
  mobileNumber: string;
}

export interface UserUnlockStatus {
  unlockStatus: boolean;
}

export interface UsersQueryParam {
  exact?: boolean;
  search?: string;
  bizType?: string;
  roleNames?: string[];
  baseAttrsAnd?: boolean;
  current?: number;
  size?: number;
  orders?: string;
}

export interface UserCreateParam {
  username: string;
  password: string;
}
