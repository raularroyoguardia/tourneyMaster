import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITorneig } from '../interfaces/iTorneig';
import { Observable } from 'rxjs';

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

  

  constructor(private _http: HttpClient) { }

  public getTornejos(): Observable<HttpResponse<ITorneig[]>> {
    return this._http.get<ITorneig[]>('http://127.0.0.1:8000/api/torneigs', { observe: 'response' });
  }

  public getTorneig(id: any): Observable<HttpResponse<ITorneig>> {
    return this._http.get<ITorneig>(`http://127.0.0.1:8000/api/torneig/${id}`, { observe: 'response' });
  }

  public createTorneig(torneig: any): Observable<HttpResponse<any>> {
    return this._http.post<any>('http://127.0.0.1:8000/api/torneig/new', torneig, { observe: 'response' });
  }

  public updateTorneig(id: any, torneig: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`http://127.0.0.1:8000/api/torneig/edit/${id}`, torneig, { observe: 'response' });
  }

  public deleteTorneig(id: any) {
    return this._http.delete<any>(`http://127.0.0.1:8000/api/torneig/delete/${id}`);
  }

  getJocs() {
    return this._http.get<Joc[]>('http://localhost:8000/api/jocs');
  }

  public unirseATorneig(torneig_id: number, equip_id: number): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/equip/unirse', {torneig_id: torneig_id, equip_id: equip_id });
  }
  
}