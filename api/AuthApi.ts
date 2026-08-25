import { APIRequestContext } from '@playwright/test';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export class AuthApi {
  constructor(
    private readonly request: APIRequestContext
  ) {}

  async login(
    credentials: LoginCredentials
  ) {
    return this.request.post('/api/auth/login', {
      data: credentials
    });
  }
}