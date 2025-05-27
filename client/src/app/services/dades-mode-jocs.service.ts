import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IModeJoc } from '../interfaces/iModeJoc';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DadesModeJocsService {
  private readonly API_URL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  // 🔐 Headers con autenticación básica
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('tourne347:UOrC8oX5')
    });
  }

  public getModeJocs(): Observable<HttpResponse<IModeJoc[]>> {
    return this._http.get<IModeJoc[]>(`${this.API_URL}/modejocs`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getModeJoc(id: any): Observable<HttpResponse<IModeJoc>> {
    return this._http.get<IModeJoc>(`${this.API_URL}/modejoc/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public createModeJoc(modeJoc: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.API_URL}/modejoc/new`, modeJoc, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public updateModeJoc(id: any, modeJoc: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`${this.API_URL}/modejoc/edit/${id}`, modeJoc, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public deleteModeJoc(id: any): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/modejoc/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
