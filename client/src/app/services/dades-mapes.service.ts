import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMapa } from '../interfaces/iMapa';

@Injectable({
  providedIn: 'root'
})
export class DadesMapesService {

  constructor(private _http: HttpClient) { }

  public getMapes(): Observable<HttpResponse<IMapa[]>> {
    return this._http.get<IMapa[]>('http://127.0.0.1:8000/api/mapas', { observe: 'response' });
  }

  public createMapes(mapa: any): Observable<HttpResponse<any>> {
    return this._http.post<any>('http://127.0.0.1:8000/api/mapa/new', mapa, { observe: 'response' });
  }

  public deleteMapes(id: any): Observable<HttpResponse<any>> {
    return this._http.get<any>(`http://127.0.0.1:8000/api/mapa/delete/${id}`);
  }
}
