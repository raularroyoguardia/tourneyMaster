import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = 'http://127.0.0.1:8000/api/login';
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) { }
  
  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, {email, password}).pipe(
      tap(response => {
        if(response.token) {
          console.log(response.token);
          this.setToken(response.token);
        }
      })
    )
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    return Date.now() < exp;
 }

 logout(): void {
  localStorage.removeItem(this.tokenKey);
  this.router.navigate(['/welcome']);
 }

  // private apiUrl = 'http://localhost:8000/auth';
  // constructor(private router: Router, private http: HttpClient) {}

  // login(email: string, password: string): Observable<any> {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'mode': 'no-cors'
  //   };
  //   const payload = { email, password };
  //   return this.http.post(`${this.apiUrl}/login`, payload);
  // }

  // logout(): void {
  //   localStorage.removeItem('authToken');
  //   this.router.navigate(['/login']);
  // }

  // register(user: any): Observable<any> {
  //   // Aunque venga el rol del frontend, Laravel debería ignorarlo
  //   user.role = 'userEquip'; // Por si quieres mandarlo igualmente
  
  //   return this.http.post('http://127.0.0.1:8000/api/register', user);
  // }
}