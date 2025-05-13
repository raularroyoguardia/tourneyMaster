import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handleToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  revokeToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    if(this.getToken())
      return true;
    
    return false;
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserName(): string {
    const user = this.getUser();
    return user ? user.name: '';
  }

  getFullName(): string {
    const user = this.getUser();
    const apellido1 = user.apellido1;
    const apellido2 = user.apellido2;
    return user.name + ' ' + apellido1.charAt(0) + apellido2.charAt(0); 
  }

  getUserTrofeus(): string {
    const user = this.getUser();
    return user ? user.trofeus: '';
  }
}
