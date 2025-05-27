import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPartida } from '../interfaces/iPartida';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DadesPartidasService {
  private readonly API_URL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  // 🔐 Headers con autenticación básica
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('tourne347:UOrC8oX5')
    });
  }

  public getPartides(): Observable<HttpResponse<IPartida[]>> {
    return this._http.get<IPartida[]>(`${this.API_URL}/partides`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getPartida(id: any): Observable<HttpResponse<IPartida>> {
    return this._http.get<IPartida>(`${this.API_URL}/partida/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public createPartida(partida: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.API_URL}/partida/new`, partida, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public updatePartida(id: any, partida: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`${this.API_URL}/partida/edit/${id}`, partida, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public deletePartida(id: any): Observable<any> {
    return this._http.delete<any>(`${this.API_URL}/partida/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
