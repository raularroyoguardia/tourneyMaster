import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMapa } from '../interfaces/iMapa';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DadesMapesService {
  private readonly API_URL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  // 🔐 Método para incluir cabeceras con autenticación básica
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('tourne347:UOrC8oX5')
    });
  }

  public getMapes(): Observable<HttpResponse<IMapa[]>> {
    return this._http.get<IMapa[]>(`${this.API_URL}/mapas`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public createMapes(mapa: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.API_URL}/mapa/new`, mapa, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public deleteMapes(id: any): Observable<HttpResponse<any>> {
    return this._http.get<any>(`${this.API_URL}/mapa/delete/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }
}
