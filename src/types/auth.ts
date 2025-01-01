export interface RegisterData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthError {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  name?: string;
}

// Re-export RegisterError for backward compatibility
export type RegisterError = AuthError;