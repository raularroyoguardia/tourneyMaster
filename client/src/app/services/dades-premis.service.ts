import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPremi } from '../interfaces/iPremi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadesPremisService {

  constructor(private _http: HttpClient) { }

  public getPremis(): Observable<HttpResponse<IPremi[]>> {
    return this._http.get<IPremi[]>('http://127.0.0.1:8000/api/premis', { observe: 'response' });
  }

  public getPremi(id: any): Observable<HttpResponse<IPremi>> {
    return this._http.get<IPremi>(`http://127.0.0.1:8000/api/premi/${id}`, { observe: 'response' });
  }

  public createPremi(premi: any): Observable<HttpResponse<any>> {
    return this._http.post<any>('http://127.0.0.1:8000/api/premi/new', premi, { observe: 'response' });
  }

  public deletePremi(id: any) {
    return this._http.delete<any>(`http://127.0.0.1:8000/api/premi/delete/${id}`);
  }
}