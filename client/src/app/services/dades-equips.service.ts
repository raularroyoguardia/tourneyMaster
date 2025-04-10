import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEquip } from '../interfaces/iEquip';

@Injectable({
  providedIn: 'root'
})
export class DadesEquipsService {

  constructor(private _http: HttpClient) { }

  public getEquips(): Observable<HttpResponse<IEquip[]>> {
    return this._http.get<IEquip[]>('http://127.0.0.1:8000/equips', { observe: 'response' });
  }

  public getEquip(id: any): Observable<HttpResponse<IEquip>> {
    return this._http.get<IEquip>(`http://127.0.0.1:8000/equip/${id}`, { observe: 'response' });
  }

  public createEquip(equip: any): Observable<HttpResponse<any>> {
    return this._http.post<any>('http://127.0.0.1:8000/equip/new', equip, { observe: 'response' });
  }

  public updateEquip(id: any, equip: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`http://127.0.0.1:8000/equip/edit/${id}`, equip, { observe: 'response' });
  } 

  public deleteEquip(id: any) {
    return this._http.delete<any>(`http://127.0.0.1:8000/equip/delete/${id}`);
  }

  getIndividual(): Observable<any> {
    return this._http.get(`http://127.0.0.1:8000/classification/individual`);
  }

  getCollective(): Observable<any> {
    return this._http.get(`http://127.0.0.1:8000/classification/collectiu`);
  }
}
