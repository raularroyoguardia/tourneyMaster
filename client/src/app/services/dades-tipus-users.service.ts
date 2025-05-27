import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITipusUser } from '../interfaces/iTipusUser';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DadesTipusUsersService {
  private readonly API_URL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('tourne347:UOrC8oX5')
    });
  }

  public getTipusUsers(): Observable<HttpResponse<ITipusUser[]>> {
    return this._http.get<ITipusUser[]>(`${this.API_URL}/tipus_usuari`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getTipusUser(id: any): Observable<HttpResponse<ITipusUser>> {
    return this._http.get<ITipusUser>(`${this.API_URL}/tipus_usuari/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public createTipusUser(tipusUser: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.API_URL}/tipus_usuari/new`, tipusUser, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public updateTipusUser(id: any, tipusUser: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`${this.API_URL}/tipus_usuari/edit/${id}`, tipusUser, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public deleteTipusUser(id: any): Observable<any> {
    return this._http.delete<any>(`${this.API_URL}/tipus_usuari/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
