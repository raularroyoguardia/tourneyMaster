import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/auth';
  constructor(private router: Router, private http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token ? true : false;
  }

  login(email: string, password: string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'mode': 'no-cors'
    };
    const payload = { email, password };
    return this.http.post(`${this.apiUrl}/login`, payload);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}