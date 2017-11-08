// Represents a User entity
export interface User {
  id: number;
  username: string;
  password: string;
  companyId: number;
  fullName: string;
  groups: Groups;
  urlAvatar: string;
}

export interface Groups {
  key: number;
  label: string;
}
