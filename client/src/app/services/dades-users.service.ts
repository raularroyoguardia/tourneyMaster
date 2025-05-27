import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iUser';
import { IEquip } from '../interfaces/iEquip';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DadesUsersService {
  private readonly API_URL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('tourne347:UOrC8oX5')
    });
  }

  public getUsers(): Observable<HttpResponse<IUser[]>> {
    return this._http.get<IUser[]>(`${this.API_URL}/users`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getOneUser(id: any): Observable<HttpResponse<IUser>> {
    return this._http.get<IUser>(`${this.API_URL}/userOne/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }
  
  public getEquips(): Observable<HttpResponse<IEquip[]>> {
    return this._http.get<IEquip[]>(`${this.API_URL}/users`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getUser(id: any): Observable<HttpResponse<IUser>> {
    return this._http.get<IUser>(`${this.API_URL}/user/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public createUser(user: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.API_URL}/user/new`, user, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public updateUser(id: any, user: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.API_URL}/user/edit/${id}`, user, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public deleteUser(id: any) {
    return this._http.delete<any>(`${this.API_URL}/user/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
