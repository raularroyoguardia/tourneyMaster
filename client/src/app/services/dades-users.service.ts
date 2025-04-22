import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iUser';
import { IEquip } from '../interfaces/iEquip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadesUsersService {

  constructor(private _http: HttpClient) { }

  public getUsers(): Observable<HttpResponse<IUser[]>> {
    return this._http.get<IUser[]>('http://127.0.0.1:8000/api/users', { observe: 'response' });
  }
  
  public getEquips(): Observable<HttpResponse<IEquip[]>> {
    return this._http.get<IEquip[]>('http://127.0.0.1:8000/api/users', { observe: 'response' });
  }

  public getUser(id: any): Observable<HttpResponse<IUser>> {
    return this._http.get<IUser>(`http://127.0.0.1:8000/api/user/${id}`, { observe: 'response' });
  }

  public createUser(user: any): Observable<HttpResponse<any>> {
    return this._http.post<any>('http://127.0.0.1:8000/api/user/new', user, { observe: 'response' });
  }

  public updateUser(id: any, user: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`http://127.0.0.1:8000/api/user/edit/${id}`, user, { observe: 'response' });
  }

  public deleteUser(id: any) {
    return this._http.delete<any>(`http://127.0.0.1:8000/api/user/delete/${id}`);

  }
}