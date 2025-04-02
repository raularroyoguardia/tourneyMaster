import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITipusUser } from '../interfaces/iTipusUser';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DadesTipusUsersService {

  constructor(private _http: HttpClient) { }

  public getTipusUsers(): Observable<HttpResponse<ITipusUser[]>> {
    return this._http.get<ITipusUser[]>('http://127.0.0.1:8000/web/tipus_usuari', { observe: 'response' });
  }

  public getTipusUser(id: any): Observable<HttpResponse<ITipusUser>> {
    return this._http.get<ITipusUser>(`http://127.0.0.1:8000/web/tipus_usuari/${id}`, { observe: 'response' });
  }

  public createTipusUser(tipusUser: any): Observable<HttpResponse<any>> {
    return this._http.post<any>('http://127.0.0.1:8000/web/tipus_usuari/new', tipusUser, { observe: 'response' });
  }

  public updateTipusUser(id: any, tipusUser: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`http://127.0.0.1:8000/web/tipus_usuari/edit/${id}`, tipusUser, { observe: 'response' });
  }

  public deleteTipusUser(id: any) {
    return this._http.delete<any>(`http://127.0.0.1:8000/web/tipus_usuari/delete/${id}`);

  }
}