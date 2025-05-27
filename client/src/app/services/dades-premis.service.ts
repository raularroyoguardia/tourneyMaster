import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPremi } from '../interfaces/iPremi';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DadesPremisService {
  private readonly API_URL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('tourne347:UOrC8oX5')
    });
  }

  public getPremis(): Observable<HttpResponse<IPremi[]>> {
    return this._http.get<IPremi[]>(`${this.API_URL}/premis`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getPremi(id: any): Observable<HttpResponse<IPremi>> {
    return this._http.get<IPremi>(`${this.API_URL}/premi/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public createPremi(premi: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.API_URL}/premi/new`, premi, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public deletePremi(id: any): Observable<any> {
    return this._http.delete<any>(`${this.API_URL}/premi/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
