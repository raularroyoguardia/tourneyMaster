import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IModeJoc } from '../interfaces/iModeJoc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadesModeJocsService {

  constructor(private _http: HttpClient) { }

  public getModeJocs(): Observable<HttpResponse<IModeJoc[]>>{
    return this._http.get<IModeJoc[]>('http://127.0.0.1:8000/api/modejocs', { observe: 'response' });
  }

  public getModeJoc(id: any): Observable<HttpResponse<IModeJoc>>{
    return this._http.get<IModeJoc>(`http://127.0.0.1:8000/api/modejoc/${id}`, { observe: 'response' });
  }

  public createModeJoc(modeJoc: any): Observable<HttpResponse<any>>{
    return this._http.post<any>('http://127.0.0.1:8000/api/modejoc/new', modeJoc, { observe: 'response' });
  }

  public updateModeJoc(id: any, modeJoc: any): Observable<HttpResponse<any>>{
    return this._http.put<any>(`http://127.0.0.1:8000/api/modejoc/edit/${id}`, modeJoc, { observe: 'response' });
  }

  public deleteModeJoc(id: any){
    return this._http.delete<any>(`http://127.0.0.1:8000/api/modejoc/delete/${id}`);
  }
}