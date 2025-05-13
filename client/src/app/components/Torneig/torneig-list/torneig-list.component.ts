
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


  constructor(private torneigService: DadesTornejosService, private http: HttpClient, private authService: AuthService) { }
  ngOnInit(): void {
    const usuari = JSON.parse(localStorage.getItem('user') || '{}');
    this.tipusUsuariId = usuari.tipus_usuari_id;

    const usuariString = localStorage.getItem('user');
    if (usuariString) {
      const usuari = JSON.parse(usuariString);
      const usuariId = usuari.id;
      console.log('Usuari loguejat:', usuariId);
  
      this.torneigService.getTorneigsPerUsuari(usuariId).subscribe({
        next: (response) => {
          this.torneigs = response.body || [];
          console.log('Torneigs per usuari loguejat:', this.torneigs);
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
      
      const currentUser = this.authService.getCurrentUser();
      const currentUserId = currentUser.id;
      const tipusUsuariId = currentUser.tipus_usuari_id;
  
      // 🧍 Usuario individual => obtener equipos y filtrar el de max 1 integrante
      if (tipusUsuariId === 3) {
        this.http.get<any>('/api/equips/users').subscribe({
          next: (equips) => {
            // Filtrar los equipos donde el máximo de integrantes es 1
            const equipIndividual = equips.find((equip: { maxim_integrants: number; users: any[]; }) => equip.maxim_integrants === 1 && equip.users.some(user => user.id === currentUserId));
  
            if (!equipIndividual) {
              console.error('No s\'ha trobat un equip individual per aquest usuari.');
              alert('No tens cap equip individual registrat.');
              return;
            }
            
            const equipId = equipIndividual.id;
            console.log('Equip individual trobat:', equipIndividual);
  
            // Unirse al torneo usando el equipId del equipo individual
            this.torneigService.unirseATorneig(torneigId, equipId).subscribe({
              next: (response) => {
                console.log(response.message);
                alert('T\'has unit correctament al torneig com a usuari individual.');
                location.reload();
              },
              error: (err) => {
                console.error('Error al unir-se al torneig:', err);
                alert(err.error.message || 'Error al unir-se al torneig');
              }
            });
          },
          error: (err) => {
            console.error('No s\'ha pogut obtenir la llista d\'equips:', err);
            alert('No s\'han pogut obtenir els equips associats al teu usuari.');
          }
        });
      } else {
        // 👥 Usuario col·lectiu => continuar como lo tenías antes
        this.http.get<any>(`http://localhost:8000/api/user/${currentUserId}`).subscribe({
          next: (userData) => {
            if (!userData || !userData.equip) {
              console.error('No s\'ha trobat un equip per aquest usuari.');
              alert('No tens cap equip registrat.');
              return;
            }
  
            const equipId = userData.equip.id;
            console.log('ID de l\'equip col·lectiu:', equipId);
  
            this.torneigService.unirseATorneig(torneigId, equipId).subscribe({
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
            console.error('No s\'ha pogut obtenir les dades de l\'usuari:', err);
            alert('No s\'han pogut obtenir les dades del teu equip.');
          }
        });
      }
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

  // actualitzarGuanyadorPartida(partidaId: number, equipId: number) {
  //   this.http.put(`http://localhost:8000/api/partides/${partidaId}`, {
  //     resultat_equip_id: equipId
  //   }).subscribe({
  //     next: (res) => {
  //       console.log('Resultat actualitzat:', res);
  //       alert('S\'ha assignat el guanyador correctament.');
  //       location.reload(); // o actualitza només la vista si és possible
  //     },
  //     error: (err) => {
  //       console.error('Error al actualitzar el resultat:', err);
  //       alert('No s\'ha pogut assignar el guanyador.');
  //     }
  //   });
  // }

  actualitzarGuanyadorPartida(partidaId: number, equipId: number) {
    // 1. Asignar el guanyador de la partida
    this.http.put(`http://localhost:8000/api/partides/${partidaId}`, {
      resultat_equip_id: equipId
    }).subscribe({
      next: (res) => {
        console.log('Resultat actualitzat:', res);
  
        // 2. Trobar equip guanyador
        const equipGuanyador = this.selectedTorneig?.equips.find(e => e.id === equipId);
        if (!equipGuanyador) {
          alert('No s\'ha trobat l\'equip guanyador');
          return;
        }
  
        // 3. Obtenir usuaris del equip
        this.http.get<IUser[]>(`http://localhost:8000/api/equips/${equipId}/usuaris`).subscribe({
          next: (usuaris) => {
            if (!usuaris || usuaris.length === 0) {
              alert('No hi ha usuaris en aquest equip.');
              return;
            }
  
            // 4. Repartir trofeus
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
  
  
  actualitzarEstatTorneig(torneig: ITorneig): string {
    const avui = new Date();
    const dataInici = new Date(torneig.data_inici);
    const dataFi = new Date(torneig.data_fi);
  
    if (avui < dataInici) {
      return 'No Començat';
    }
  
    if (avui > dataFi) {
      return 'Finalitzat';
    }
  
    return 'En Procés';
  }
  
}