export interface User {
  username: string;
  password?: string; 
  role: 'admin' | 'user'; 
  status: 'active' | 'inactive'; // User status
  createdAt: Date;
}

export interface AuthUser {
  username: string;
  role: 'admin' | 'user';
  isLoggedIn: boolean;
}