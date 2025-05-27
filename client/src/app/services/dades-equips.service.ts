import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEquip } from '../interfaces/iEquip';
import { TokenService } from './auth/token.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DadesEquipsService {
  private readonly API_URL = environment.apiURL;

  constructor(
    private _http: HttpClient,
    private tokenService: TokenService
  ) {}

  // 🔐 Método reutilizable para añadir cabecera Authorization
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('tourne347:UOrC8oX5')
    });
  }

  public getEquips(): Observable<HttpResponse<IEquip[]>> {
    return this._http.get<IEquip[]>(`${this.API_URL}/equips`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getEquip(id: any): Observable<HttpResponse<IEquip>> {
    return this._http.get<IEquip>(`${this.API_URL}/equip/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getUserEquips(): Observable<any> {
    return this._http.get<any[]>(`${this.API_URL}/equips/user`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getEquipsDisponibles(): Observable<any> {
    return this._http.get(`${this.API_URL}/equips/disponibles`, {
      headers: this.getAuthHeaders()
    });
  }

  public createEquip(equip: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.API_URL}/equip/new`, equip, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public updateEquip(id: any, equip: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`${this.API_URL}/equip/edit/${id}`, equip, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public deleteEquip(id: any) {
    return this._http.delete<any>(`${this.API_URL}/equip/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  public getIndividual(): Observable<any> {
    return this._http.get(`${this.API_URL}/classification/individual`, {
      headers: this.getAuthHeaders()
    });
  }

  public getCollectiu(): Observable<any> {
    return this._http.get(`${this.API_URL}/classification/collectiu`, {
      headers: this.getAuthHeaders()
    });
  }

  public unirseAUser(equipId: number): Observable<any> {
    return this._http.post(`${this.API_URL}/user/unirse`, { equip_id: equipId }, {
      headers: this.getAuthHeaders()
    });
  }
}
