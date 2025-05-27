import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthCredentials } from '../../interfaces/auth-credentials.model';
import { UserRegister } from '../../interfaces/user-register.model';
import { IUser } from '../../interfaces/iUser';
import { IEquip } from '../../interfaces/iEquip';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiURL;

  constructor(
    private http: HttpClient,
    public tokenService: TokenService
  ) {}

  // Genera los headers con autenticación básica
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('tourne347:UOrC8oX5')
    });
  }

  login(credentials: AuthCredentials): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  register(user: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, user);
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.API_URL}/logout`, {
      headers: this.getAuthHeaders()
    });
  }

  setCurrentUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getCurrentUserId(): number | null {
    const user = this.getCurrentUser();
    return user?.id || null;
  }

  clearUser() {
    localStorage.removeItem('currentUser');
  }
}
