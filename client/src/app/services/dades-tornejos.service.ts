import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITorneig } from '../interfaces/iTorneig';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

interface Mapa {
  id: number;
  nom: string;
  pivot: {
    mode_joc_id: number;
    mapa_id: number;
  };
}

interface ModeJoc {
  id: number;
  nom: string;
  descripcio: string;
  jugadors: number;
  created_at: string;
  updated_at: string;
  jocId: number;
  mapas: Mapa[];
}

interface Joc {
  id: number;
  nom: string;
  categoria: string;
  plataforma: string;
  foto: string;
  created_at: string;
  updated_at: string;
  mode_jocs: ModeJoc[];
}

@Injectable({
  providedIn: 'root'
})
export class DadesTornejosService {
  private readonly API_URL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('tourne347:UOrC8oX5')
    });
  }

  public getTornejos(): Observable<HttpResponse<ITorneig[]>> {
    return this._http.get<ITorneig[]>(`${this.API_URL}/torneigs`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getTorneigsPerEstat(estat: string) {
    return this._http.get<ITorneig[]>(`${this.API_URL}/torneigs/estat/${estat}`, {
      headers: this.getAuthHeaders()
    });
  }
  
  public getTorneigsPerUsuari(usuariId: number): Observable<HttpResponse<ITorneig[]>> {
    return this._http.get<ITorneig[]>(`${this.API_URL}/torneigs/per-usuari/${usuariId}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public getUserATorneig(usuariId: number): Observable<HttpResponse<ITorneig[]>> {
    return this._http.get<ITorneig[]>(`${this.API_URL}/torneigs/user/${usuariId}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }
  
  public getTorneig(id: any): Observable<HttpResponse<ITorneig>> {
    return this._http.get<ITorneig>(`${this.API_URL}/torneig/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public createTorneig(torneig: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.API_URL}/torneig/new`, torneig, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public updateTorneig(id: any, torneig: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`${this.API_URL}/torneig/edit/${id}`, torneig, {
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  public deleteTorneig(id: any) {
    return this._http.delete<any>(`${this.API_URL}/torneig/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  public getJocs() {
    return this._http.get<Joc[]>(`${this.API_URL}/jocs`, {
      headers: this.getAuthHeaders()
    });
  }

  public unirseATorneig(torneig_id: number, equip_id: number): Observable<any> {
    return this._http.post(`${this.API_URL}/equip/unirse`, 
      { torneig_id, equip_id }, 
      { headers: this.getAuthHeaders() }
    );
  }
}
