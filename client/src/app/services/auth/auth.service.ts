import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthCredentials } from '../../interfaces/auth-credentials.model';
import { UserRegister } from '../../interfaces/user-register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiURL;

  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  register(user: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, user);
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.API_URL}/logout`);
  }

  setCurrentUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Recupera el usuario actual
  getCurrentUser() {
    const user = localStorage.getItem('user');
    console.log('User from localStorage:', user);
    return user ? JSON.parse(user) : null;
  }

  // Devuelve el ID del usuario actual
  getCurrentUserId(): number | null {
    const user = this.getCurrentUser();
    return user?.id || null;
  }

  // Para logout
  clearUser() {
    localStorage.removeItem('currentUser');
  }
}