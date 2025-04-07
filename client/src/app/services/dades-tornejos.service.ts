import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITorneig } from '../interfaces/iTorneig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadesTornejosService {

  constructor(private _http: HttpClient) { }

  public getTornejos(): Observable<HttpResponse<ITorneig[]>> {
    return this._http.get<ITorneig[]>('http://127.0.0.1:8000/torneigs', { observe: 'response' });
  }

  public getTorneig(id: any): Observable<HttpResponse<ITorneig>> {
    return this._http.get<ITorneig>(`http://127.0.0.1:8000/torneig/${id}`, { observe: 'response' });
  }

  public createTorneig(torneig: any): Observable<HttpResponse<any>> {
    return this._http.post<any>('http://127.0.0.1:8000/torneig/new', torneig, { observe: 'response' });
  }

  public updateTorneig(id: any, torneig: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`http://127.0.0.1:8000/torneig/edit/${id}`, torneig, { observe: 'response' });
  }

  public deleteTorneig(id: any) {
    return this._http.delete<any>(`http://127.0.0.1:8000/torneig/delete/${id}`);
  }
}