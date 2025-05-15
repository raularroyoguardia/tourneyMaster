
import { Component, OnInit } from '@angular/core';
import { ITorneig } from '../../../interfaces/iTorneig';
import { IEquip } from '../../../interfaces/iEquip';
import { IUser } from '../../../interfaces/iUser';
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
  tipusUsuariId: number = 0;

  constructor(
    private torneigService: DadesTornejosService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.actualitzarEstatTotsElsTorneigs();
    
      this.http.get<any[]>('/api/torneigs/stats').subscribe(stats => {
        this.torneigsStats = stats;
      });
    }, 1000);
    
    
    const usuariString = localStorage.getItem('user');
    if (usuariString) {
      const usuari = JSON.parse(usuariString);
      const usuariId = usuari.id;
      this.tipusUsuariId = usuari.tipus_usuari_id;

      this.torneigService.getTorneigsPerUsuari(usuariId).subscribe({
        next: (response) => {
          let tornejos = response.body || [];
          console.log('Tornejos carregats:', tornejos);

          if (this.tipusUsuariId === 3) {
            tornejos = tornejos.filter(torneig =>
              torneig.equips?.every(equip => equip.maxim_integrants === 1)
            );
          }
          this.torneigs = tornejos;
        },
        error: (error) => {
          console.error('Error carregant tornejos per usuari loguejat', error);
        }
      });
    } else {
      console.warn('Usuari no trobat al localStorage');
    }
  }


  unirseTorneig(torneigId: number) {
    this.http.get<any[]>('/api/torneigs/stats').subscribe(stats => {
      this.torneigsStats = stats;
      const torneigStats = this.torneigsStats.find(t => t.torneig_id === torneigId);
      if (torneigStats?.numero_equips === torneigStats?.total_equips) {
        alert('Aquest torneig ja està ple i no s\'hi poden afegir més equips.');
        return;
      }
  
      const torneig = this.torneigs.find(t => t.id === torneigId);
      if (!torneig) {
        alert('No s\'ha trobat el torneig.');
        return;
      }
  
      const currentUser = this.authService.getCurrentUser();
      const currentUserId = currentUser.id;
  
      const esTorneigIndividual = torneig.tipus === 'individual';
      const esTorneigCollectiu = torneig.tipus === 'col·lectiu';
  
      this.http.get<IEquip[]>(`http://localhost:8000/api/users/${currentUserId}/equips`).subscribe({
        next: (equipsUsuari) => {
          let equipAdequat: IEquip | undefined;
  
          if (esTorneigIndividual) {
            equipAdequat = equipsUsuari.find(e =>
              e.maxim_integrants === 1             
            );
          } else if (esTorneigCollectiu) {
            equipAdequat = equipsUsuari.find(e =>
              e.maxim_integrants > 1
            );
          }
        
          if (!equipAdequat) {
            alert('No tens un equip adequat per unir-te a aquest torneig.');
            return;
          }
  
          this.torneigService.unirseATorneig(torneigId, equipAdequat.id).subscribe({
            next: (response) => {
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
          console.error('Error al obtenir equips del usuari:', err);
          alert('No s\'han pogut obtenir els equips del teu usuari.');
        }
      });
    });
  }
  

  mostrarDetalls(torneig: ITorneig) {
    this.selectedTorneig = torneig;
    console.log('Torneig seleccionat:', torneig);
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
    let estat = torneig.estat.toLowerCase();
    return estat === 'finalitzat' || estat === 'en procès' || this.torneigPle(torneig.id);
  }

  torneigPle(torneigId: number): boolean {
    const stat = this.torneigsStats.find(s => s.torneig_id === torneigId);
    if (!stat) return false;
    return stat.torneig_ple;
  }  

  actualitzarGuanyadorPartida(partidaId: number, equipId: number) {
    this.http.put(`http://localhost:8000/api/partides/${partidaId}`, {
      resultat_equip_id: equipId
    }).subscribe({
      next: (res) => {
        const equipGuanyador = this.selectedTorneig?.equips.find(e => e.id === equipId);
        if (!equipGuanyador) {
          alert('No s\'ha trobat l\'equip guanyador');
          return;
        }

        this.http.get<IUser[]>(`http://localhost:8000/api/equips/${equipId}/usuaris`).subscribe({
          next: (usuaris) => {
            if (!usuaris || usuaris.length === 0) {
              alert('No hi ha usuaris en aquest equip.');
              return;
            }

            const premiTotal = this.selectedTorneig?.premi_valor || 0;
            const trofeusPerUsuari = Math.floor(premiTotal / usuaris.length);

            usuaris.forEach(usuari => {
              this.http.put(`http://localhost:8000/api/users/${usuari.id}/add-trofeus`, {
                trofeus: trofeusPerUsuari
              }).subscribe({
                next: () => {
                  console.log(`S'han afegit ${trofeusPerUsuari} trofeus a ${usuari.name}`);
                },
                error: err => {
                  console.error(`Error afegint trofeus a ${usuari.name}:`, err);
                }
              });
            });

            alert(`S\'ha assignat el guanyador i s\'han repartit ${trofeusPerUsuari} trofeus per usuari.`);
            location.reload();
          },
          error: (err) => {
            console.error('Error al obtenir usuaris del equip guanyador:', err);
            alert('No s\'han pogut obtenir els usuaris del equip guanyador.');
          }
        });
      },
      error: (err) => {
        console.error('Error al actualitzar el resultat:', err);
        alert('No s\'ha pogut assignar el guanyador.');
      }
    });
  }

  actualitzarEstatTotsElsTorneigs(): void {
    this.torneigs.forEach(torneig => {
      const avui = new Date();
      const dataInici = new Date(torneig.data_inici);
      const dataFi = new Date(torneig.data_fi);
  
      let nouEstat = '';
      if (avui < dataInici) nouEstat = 'No Començat';
      else if (avui > dataFi) nouEstat = 'Finalitzat';
      else nouEstat = 'En Procès';
  
      if (torneig.estat !== nouEstat) {
        this.http.put(`http://localhost:8000/api/torneigs/${torneig.id}/estat`, {
          estat: nouEstat
        }).subscribe({
          next: () => {
            console.log(`Estat del torneig ${torneig.id} actualitzat a: ${nouEstat}`);
            torneig.estat = nouEstat;
          },
          error: (err) => {
            console.error(`Error al actualitzar estat del torneig ${torneig.id}:`, err);
          }
        });
      }
    });
  }
  
}