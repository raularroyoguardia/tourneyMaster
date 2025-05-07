
import { Component, OnInit } from '@angular/core';
import { ITorneig } from '../../../interfaces/iTorneig';
import { IEquip } from '../../../interfaces/iEquip';
import { DadesTornejosService } from '../../../services/dades-tornejos.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-torneig-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './torneig-list.component.html',
  styleUrl: './torneig-list.component.css'
})

export class TorneigListComponent implements OnInit {
  torneigs: ITorneig[] = [];
  selectedTorneig: ITorneig | null = null;
  equips: IEquip[] = [];
  torneigsStats: { torneig_id: number, total_equips: number, numero_equips: number, torneig_ple: boolean }[] = [];

  constructor(private torneigService: DadesTornejosService, private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    console.log("Listat de tornejos inicialitzat");

    this.torneigService.getTornejos().subscribe(resp => {
      if (resp.body !== null) {
        this.torneigs = resp.body;
      }
    });

    this.http.get<IEquip[]>('http://localhost:8000/api/equips/users').subscribe(data => {
      this.equips = data;
    });
  }

  unirseTorneig(torneigId: number) {
    this.http.get<any[]>('/api/torneigs/stats').subscribe(stats => {
      this.torneigsStats = stats;
  
      const torneigStats = this.torneigsStats.find(t => t.torneig_id === torneigId);
      if (torneigStats?.numero_equips === torneigStats?.total_equips) {
        alert('Aquest torneig ja està ple i no s\'hi poden afegir més equips.');
        return;
      }
  
      const currentUserId = this.authService.getCurrentUserId();
      console.log('Current user ID:', currentUserId);
  
      // 🚀 Nueva llamada para obtener el equipo colectivo del usuario
      this.http.get<any>(`http://localhost:8000/api/users/${currentUserId}`).subscribe({
        next: (equip) => {
          console.log('Equip col·lectiu:', equip);
  
          this.torneigService.unirseATorneig(torneigId, equip.id).subscribe({
            next: (response) => {
              console.log(response.message);
              alert('T\'has unit correctament al torneig.');
              location.reload();
            },
            error: (err) => {
              console.error('Error al unir-se al torneig:', err);
              alert(err.error.message || 'Error al unir-se al torneig');
            }
          });
        },
        error: (err) => {
          console.error('No s\'ha trobat cap equip col·lectiu per aquest usuari:', err);
          alert('No tens cap equip col·lectiu registrat.');
        }
      });
    });
  }
  
  
  mostrarDetalls(torneig: ITorneig) {
    this.selectedTorneig = torneig;
  }

  tancarModal() {
    this.selectedTorneig = null;
  }

  getTotalPuntos(equipId: number): number {
    if (!this.selectedTorneig?.partides) return 0;
    return this.selectedTorneig.partides.filter(
      partida => partida.resultat_equip_id === equipId
    ).length;
  }

  get equipsOrdenats(): any[] {
    if (!this.selectedTorneig?.equips) return [];
    return [...this.selectedTorneig.equips].sort(
      (a, b) => this.getTotalPuntos(b.id) - this.getTotalPuntos(a.id)
    );
  }

  getTrofeusPerEquip(equipId: number): number {
    if (!this.selectedTorneig) return 0;
    const totalVictories = this.selectedTorneig.partides.length;
    const victoriesEquip = this.getTotalPuntos(equipId);
    if (totalVictories === 0) return 0;
    const premiTotal = this.selectedTorneig.premi_valor || 0;
    return Math.round(victoriesEquip * premiTotal);
  }

  estaTorneoDeshabilitado(torneig: ITorneig): boolean {
    return torneig.estat === 'Finalitzat'
      || torneig.estat === 'En procès'
      || this.torneigPle(torneig.id);

  }

  torneigPle(torneigId: number): boolean {
    const stat = this.torneigsStats.find(s => s.torneig_id === torneigId);
    if (!stat) {
      return false;  
    }
    return stat.torneig_ple;  
  }
  
  
}