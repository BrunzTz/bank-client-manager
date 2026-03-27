import { Injectable } from '@angular/core';

const AUTH_TOKEN_KEY = 'bank-client-manager-token';
const USER_STORAGE_KEY = 'bank-client-manager-users';

interface AuthUser {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private getStoredUsers(): AuthUser[] {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private saveStoredUsers(users: AuthUser[]): void {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  }

  async register(username: string, password: string): Promise<boolean> {
    const cleanUsername = (username || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanUsername || !cleanPassword || cleanPassword.length < 6) {
      return false;
    }

    const users = this.getStoredUsers();
    const alreadyExists = users.some((user) => user.username.toLowerCase() === cleanUsername);

    if (alreadyExists) {
      return false;
    }

    users.push({ username: cleanUsername, password: cleanPassword });
    this.saveStoredUsers(users);

    return true;
  }

  async login(username: string, password: string): Promise<boolean> {
    const cleanUsername = (username || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanUsername || !cleanPassword) {
      return false;
    }

    const users = this.getStoredUsers();
    const userExists = users.some(
      (user) => user.username.toLowerCase() === cleanUsername && user.password === cleanPassword
    );

    if (!userExists) {
      return false;
    }

    const token = btoa(`${cleanUsername}:${Date.now()}`);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return true;
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return !!token;
  }
}