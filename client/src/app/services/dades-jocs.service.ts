import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJoc } from '../interfaces/iJoc';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DadesJocsService {
  private readonly API_URL = environment.apiURL;

  constructor(private _http: HttpClient) {}

  // 🔐 Headers con autenticación básica
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('tourne347:UOrC8oX5')
    });
  }

  public getJocs(): Observable<HttpResponse<IJoc[]>> {
    return this._http.get<IJoc[]>(`${this.API_URL}/jocs`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getJoc(id: any): Observable<HttpResponse<IJoc>> {
    return this._http.get<IJoc>(`${this.API_URL}/joc/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public createJoc(joc: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.API_URL}/joc/new`, joc, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public updateJoc(id: any, joc: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`${this.API_URL}/joc/edit/${id}`, joc, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public deleteJoc(id: any): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/joc/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
