import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPartida } from '../interfaces/iPartida';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadesPartidasService {

  constructor(private _http: HttpClient) { }

  public getPartides(): Observable<HttpResponse<IPartida[]>> {
    return this._http.get<IPartida[]>('http://127.0.0.1:8000/api/partides', { observe: 'response' });
  }

  public getPartida(id: any): Observable<HttpResponse<IPartida>> {
    return this._http.get<IPartida>(`http://127.0.0.1:8000/api/partida/${id}`, { observe: 'response' });
  }

  public createPartida(partida: any): Observable<HttpResponse<any>> {
    return this._http.post<any>('http://127.0.0.1:8000/api/partida/new', partida, { observe: 'response' });
  }

  public updatePartida(id: any, partida: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`http://127.0.0.1:8000/api/partida/edit/${id}`, partida, { observe: 'response' });
  }

  public deletePartida(id: any) {
    return this._http.delete<any>(`http://127.0.0.1:8000/api/partida/delete/${id}`);
  }
}