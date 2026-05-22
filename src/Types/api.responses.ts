export interface UserRole {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
export interface StrapiUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Response
  Department: string | null;
  FullName: string | null;
  IsAvailabale: boolean | null;
  Title_Degree: string | null;
  Unit_Floor: string | null;
  // populate=role
  role?: UserRole; 
}

//(Auth Response)
export interface AuthResponse {
  jwt: string;
  user: StrapiUser;
}
