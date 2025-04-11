import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJoc } from '../interfaces/iJoc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadesJocsService {

  constructor(private _http: HttpClient) { }

  public getJocs(): Observable<HttpResponse<IJoc[]>>{
    return this._http.get<IJoc[]>('http://127.0.0.1:8000/api/jocs', { observe: 'response' });
  }

  public getJoc(id: any): Observable<HttpResponse<IJoc>>{
    return this._http.get<IJoc>(`http://127.0.0.1:8000/api/joc/${id}`, { observe: 'response' });
  }

  public createJoc(joc: any): Observable<HttpResponse<any>>{
    return this._http.post<any>('http://127.0.0.1:8000/api/joc/new', joc, { observe: 'response' });
  }

  public updateJoc(id: any, joc: any): Observable<HttpResponse<any>>{
    return this._http.put<any>(`http://127.0.0.1:8000/api/joc/edit/${id}`, joc, { observe: 'response' });
  }

  public deleteJoc(id: any){
    return this._http.delete<any>(`http://127.0.0.1:8000/api/joc/delete/${id}`);
  }
}