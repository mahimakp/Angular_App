import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private isAuthenticated: boolean = false;

  login() {
    this.isAuthenticated = true;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
