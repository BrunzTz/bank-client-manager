import { Injectable } from '@angular/core';

const AUTH_TOKEN_KEY = 'bank-client-manager-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(username: string, password: string): boolean {
    if (!username || !password) {
      return false;
    }

    localStorage.setItem(AUTH_TOKEN_KEY, 'mock-token');
    return true;
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  }
}