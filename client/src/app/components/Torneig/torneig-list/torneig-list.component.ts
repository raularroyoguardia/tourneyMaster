
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


// export class TorneigListComponent implements OnInit {
//   torneigs: ITorneig[] = [];
//   selectedTorneig: ITorneig | null = null;
//   equips: IEquip[] = [];
//   torneigsStats: { torneig_id: number, total_equips: number, numero_equips: number, torneig_ple: boolean }[] = [];
//   tipusUsuariId: number = 0;

//   constructor(private torneigService: DadesTornejosService, private http: HttpClient, private authService: AuthService) {}

//   ngOnInit(): void {
//     const usuariString = localStorage.getItem('user');
//     if (usuariString) {
//       const usuari = JSON.parse(usuariString);
//       const usuariId = usuari.id;
//       this.tipusUsuariId = usuari.tipus_usuari_id;

//       console.log('Usuari loguejat:', usuariId);

//       this.torneigService.getTorneigsPerUsuari(usuariId).subscribe({
//         next: (response) => {
//           let tornejos = response.body || [];

//           if (this.tipusUsuariId === 3) {
//             // Filtrar només tornejos amb equips de màxim 1 integrant (individuals)
//             tornejos = tornejos.filter(torneig =>
//               torneig.equips?.every(equip => equip.maxim_integrants === 1)
//             );
//           }

//           this.torneigs = tornejos;
//           console.log('Torneigs filtrats per tipus usuari:', this.torneigs);
//         },
//         error: (error) => {
//           console.error('Error carregant tornejos per usuari loguejat', error);
//         }
//       });
//     } else {
//       console.warn('Usuari no trobat al localStorage');
//     }
//   }

//   unirseTorneig(torneigId: number) {
//     this.http.get<any[]>('/api/torneigs/stats').subscribe(stats => {
//       this.torneigsStats = stats;
  
//       const torneigStats = this.torneigsStats.find(t => t.torneig_id === torneigId);
//       if (torneigStats?.numero_equips === torneigStats?.total_equips) {
//         alert('Aquest torneig ja està ple i no s\'hi poden afegir més equips.');
//         return;
//       }
  
//       // Obtener el torneig completo para saber si es individual o col·lectiu
//       const torneig = this.torneigs.find(t => t.id === torneigId);
//       if (!torneig || !torneig.equips) {
//         alert('No s\'han pogut obtenir les dades del torneig.');
//         return;
//       }
  
//       const esTorneigIndividual = torneig.equips.every(e => e.maxim_integrants === 1);
  
//       const currentUser = this.authService.getCurrentUser();
//       const currentUserId = currentUser.id;
  
//       if (esTorneigIndividual) {
//         this.http.get<any>('/api/equips/users').subscribe({
//           next: (equips) => {
//             const equipIndividual = equips.find((equip: { maxim_integrants: number; users: any[]; }) =>
//               equip.maxim_integrants === 1 &&
//               equip.users.length === 1 &&
//               equip.users[0].id === currentUserId
//             );
  
//             if (!equipIndividual) {
//               console.error('No s\'ha trobat un equip individual per aquest usuari.');
//               alert('No tens cap equip individual registrat.');
//               return;
//             }
  
//             const equipId = equipIndividual.id;
  
//             this.torneigService.unirseATorneig(torneigId, equipId).subscribe({
//               next: (response) => {
//                 console.log(response.message);
//                 alert('T\'has unit correctament al torneig com a usuari individual.');
//                 location.reload();
//               },
//               error: (err) => {
//                 console.error('Error al unir-se al torneig:', err);
//                 alert(err.error.message || 'Error al unir-se al torneig');
//               }
//             });
//           },
//           error: (err) => {
//             console.error('No s\'han pogut obtenir els equips associats al teu usuari.', err);
//             alert('No s\'han pogut obtenir els equips associats al teu usuari.');
//           }
//         });
//       } else {
//         this.http.get<any>(`http://localhost:8000/api/user/${currentUserId}`).subscribe({
//           next: (equipData) => {
//             const equipId = equipData.id;
  
//             this.torneigService.unirseATorneig(torneigId, equipId).subscribe({
//               next: (response) => {
//                 console.log(response.message);
//                 alert('T\'has unit correctament al torneig col·lectiu.');
//                 location.reload();
//               },
//               error: (err) => {
//                 console.error('Error al unir-se al torneig:', err);
//                 alert(err.error.message || 'Error al unir-se al torneig');
//               }
//             });
//           },
//           error: (err) => {
//             console.error('No s\'han pogut obtenir les dades del teu equip.', err);
//             alert('No s\'han pogut obtenir les dades del teu equip.');
//           }
//         });
//       }
//     });
//   }
  

//   mostrarDetalls(torneig: ITorneig) {
//     this.selectedTorneig = torneig;
//   }

//   tancarModal() {
//     this.selectedTorneig = null;
//   }

//   getTotalPuntos(equipId: number): number {
//     if (!this.selectedTorneig?.partides) return 0;
//     return this.selectedTorneig.partides.filter(
//       partida => partida.resultat_equip_id === equipId
//     ).length;
//   }

//   get equipsOrdenats(): any[] {
//     if (!this.selectedTorneig?.equips) return [];
//     return [...this.selectedTorneig.equips].sort(
//       (a, b) => this.getTotalPuntos(b.id) - this.getTotalPuntos(a.id)
//     );
//   }

//   getTrofeusPerEquip(equipId: number): number {
//     if (!this.selectedTorneig) return 0;
//     const totalVictories = this.selectedTorneig.partides.length;
//     const victoriesEquip = this.getTotalPuntos(equipId);
//     if (totalVictories === 0) return 0;
//     const premiTotal = this.selectedTorneig.premi_valor || 0;
//     return Math.round(victoriesEquip * premiTotal);
//   }

//   estaTorneoDeshabilitado(torneig: ITorneig): boolean {
//     return torneig.estat === 'Finalitzat'
//       || torneig.estat === 'En procès'
//       || this.torneigPle(torneig.id);
//   }

//   torneigPle(torneigId: number): boolean {
//     const stat = this.torneigsStats.find(s => s.torneig_id === torneigId);
//     if (!stat) return false;
//     return stat.torneig_ple;
//   }

//   actualitzarGuanyadorPartida(partidaId: number, equipId: number) {
//     this.http.put(`http://localhost:8000/api/partides/${partidaId}`, {
//       resultat_equip_id: equipId
//     }).subscribe({
//       next: (res) => {
//         const equipGuanyador = this.selectedTorneig?.equips.find(e => e.id === equipId);
//         if (!equipGuanyador) {
//           alert('No s\'ha trobat l\'equip guanyador');
//           return;
//         }

//         this.http.get<IUser[]>(`http://localhost:8000/api/equips/${equipId}/usuaris`).subscribe({
//           next: (usuaris) => {
//             if (!usuaris || usuaris.length === 0) {
//               alert('No hi ha usuaris en aquest equip.');
//               return;
//             }

//             const premiTotal = this.selectedTorneig?.premi_valor || 0;
//             const trofeusPerUsuari = Math.floor(premiTotal / usuaris.length);

//             usuaris.forEach(usuari => {
//               this.http.put(`http://localhost:8000/api/users/${usuari.id}/add-trofeus`, {
//                 trofeus: trofeusPerUsuari
//               }).subscribe({
//                 next: () => {
//                   console.log(`S'han afegit ${trofeusPerUsuari} trofeus a ${usuari.name}`);
//                 },
//                 error: err => {
//                   console.error(`Error afegint trofeus a ${usuari.name}:`, err);
//                 }
//               });
//             });

//             alert(`S\'ha assignat el guanyador i s\'han repartit ${trofeusPerUsuari} trofeus per usuari.`);
//             location.reload();
//           },
//           error: (err) => {
//             console.error('Error al obtenir usuaris del equip guanyador:', err);
//             alert('No s\'han pogut obtenir els usuaris del equip guanyador.');
//           }
//         });
//       },
//       error: (err) => {
//         console.error('Error al actualitzar el resultat:', err);
//         alert('No s\'ha pogut assignar el guanyador.');
//       }
//     });
//   }

//   actualitzarEstatTorneig(torneig: ITorneig): string {
//     const avui = new Date();
//     const dataInici = new Date(torneig.data_inici);
//     const dataFi = new Date(torneig.data_fi);

//     if (avui < dataInici) return 'No Començat';
//     if (avui > dataFi) return 'Finalitzat';
//     return 'En Procés';
//   }
// }












// export class TorneigListComponent implements OnInit {
//   torneigs: ITorneig[] = [];
//   selectedTorneig: ITorneig | null = null;
//   equips: IEquip[] = [];
//   torneigsStats: { torneig_id: number, total_equips: number, numero_equips: number, torneig_ple: boolean }[] = [];
//   tipusUsuariId: number = 0;

//   constructor(
//     private torneigService: DadesTornejosService,
//     private http: HttpClient,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     const usuariString = localStorage.getItem('user');
//     if (usuariString) {
//       const usuari = JSON.parse(usuariString);
//       const usuariId = usuari.id;
//       this.tipusUsuariId = usuari.tipus_usuari_id;

//       console.log('Usuari loguejat:', usuariId);

//       // Obtener los torneos para el usuario
//       this.torneigService.getTorneigsPerUsuari(usuariId).subscribe({
//         next: (response) => {
//           let tornejos = response.body || [];

//           // Filtrar torneos dependiendo del tipo de usuario (individuales o colectivos)
//           if (this.tipusUsuariId === 3) {
//             tornejos = tornejos.filter(torneig =>
//               torneig.equips?.every(equip => equip.maxim_integrants === 1)
//             );
//           }

//           this.torneigs = tornejos;
//           console.log('Torneigs filtrats per tipus usuari:', this.torneigs);
//         },
//         error: (error) => {
//           console.error('Error carregant tornejos per usuari loguejat', error);
//         }
//       });
//     } else {
//       console.warn('Usuari no trobat al localStorage');
//     }
//   }

//   unirseTorneig(torneigId: number) {
//     this.http.get<any[]>('/api/torneigs/stats').subscribe(stats => {
//       this.torneigsStats = stats;

//       const torneigStats = this.torneigsStats.find(t => t.torneig_id === torneigId);
//       if (torneigStats?.numero_equips === torneigStats?.total_equips) {
//         alert('Aquest torneig ja està ple i no s\'hi poden afegir més equips.');
//         return;
//       }

//       const torneig = this.torneigs.find(t => t.id === torneigId);
//       if (!torneig || !torneig.equips) {
//         alert('No s\'han pogut obtenir les dades del torneig.');
//         return;
//       }

//       // Determinamos si es un torneo individual
//       const esTorneigIndividual = torneig.equips.every(e => e.maxim_integrants === 1);

//       const currentUser = this.authService.getCurrentUser();
//       const currentUserId = currentUser.id;

//       // Obtener los equipos del usuario desde la API
//       this.http.get<IEquip[]>(`/api/equips/user`).subscribe({
//         next: (equips) => {
//           // Filtramos los equipos según el tipo de torneo
//           const equip = esTorneigIndividual
//             ? equips.find(equip => equip.maxim_integrants === 1 && equip.users.length === 1 && equip.users[0].id === currentUserId)
//             : equips.find(equip => equip.maxim_integrants >= 2 && equip.users.some(user => user.id === currentUserId));

//           if (!equip) {
//             alert('No tens un equip adequat per unir-te a aquest torneig.');
//             return;
//           }

//           // Llamar a la API para unirse al torneo
//           this.torneigService.unirseATorneig(torneigId, equip.id).subscribe({
//             next: (response) => {
//               console.log(response.message);
//               alert('T\'has unit correctament al torneig.');
//               location.reload();
//             },
//             error: (err) => {
//               console.error('Error al unir-se al torneig:', err);
//               alert(err.error.message || 'Error al unir-se al torneig');
//             }
//           });
//         },
//         error: (err) => {
//           console.error('Error al obtener los equipos del usuario:', err);
//           alert('No s\'han pogut obtenir els equips del teu usuari.');
//         }
//       });
//     });
//   }

//   mostrarDetalls(torneig: ITorneig) {
//     this.selectedTorneig = torneig;
//   }

//   tancarModal() {
//     this.selectedTorneig = null;
//   }

//   getTotalPuntos(equipId: number): number {
//     if (!this.selectedTorneig?.partides) return 0;
//     return this.selectedTorneig.partides.filter(
//       partida => partida.resultat_equip_id === equipId
//     ).length;
//   }

//   get equipsOrdenats(): any[] {
//     if (!this.selectedTorneig?.equips) return [];
//     return [...this.selectedTorneig.equips].sort(
//       (a, b) => this.getTotalPuntos(b.id) - this.getTotalPuntos(a.id)
//     );
//   }

//   getTrofeusPerEquip(equipId: number): number {
//     if (!this.selectedTorneig) return 0;
//     const totalVictories = this.selectedTorneig.partides.length;
//     const victoriesEquip = this.getTotalPuntos(equipId);
//     if (totalVictories === 0) return 0;
//     const premiTotal = this.selectedTorneig.premi_valor || 0;
//     return Math.round(victoriesEquip * premiTotal);
//   }

//   estaTorneoDeshabilitado(torneig: ITorneig): boolean {
//     return torneig.estat === 'Finalitzat'
//       || torneig.estat === 'En procés'
//       || this.torneigPle(torneig.id);
//   }

//   torneigPle(torneigId: number): boolean {
//     const stat = this.torneigsStats.find(s => s.torneig_id === torneigId);
//     if (!stat) return false;
//     return stat.torneig_ple;
//   }

//   actualitzarGuanyadorPartida(partidaId: number, equipId: number) {
//     this.http.put(`http://localhost:8000/api/partides/${partidaId}`, {
//       resultat_equip_id: equipId
//     }).subscribe({
//       next: (res) => {
//         const equipGuanyador = this.selectedTorneig?.equips.find(e => e.id === equipId);
//         if (!equipGuanyador) {
//           alert('No s\'ha trobat l\'equip guanyador');
//           return;
//         }

//         this.http.get<IUser[]>(`http://localhost:8000/api/equips/${equipId}/usuaris`).subscribe({
//           next: (usuaris) => {
//             if (!usuaris || usuaris.length === 0) {
//               alert('No hi ha usuaris en aquest equip.');
//               return;
//             }

//             const premiTotal = this.selectedTorneig?.premi_valor || 0;
//             const trofeusPerUsuari = Math.floor(premiTotal / usuaris.length);

//             usuaris.forEach(usuari => {
//               this.http.put(`http://localhost:8000/api/users/${usuari.id}/add-trofeus`, {
//                 trofeus: trofeusPerUsuari
//               }).subscribe({
//                 next: () => {
//                   console.log(`S'han afegit ${trofeusPerUsuari} trofeus a ${usuari.name}`);
//                 },
//                 error: err => {
//                   console.error(`Error afegint trofeus a ${usuari.name}:`, err);
//                 }
//               });
//             });

//             alert(`S\'ha assignat el guanyador i s\'han repartit ${trofeusPerUsuari} trofeus per usuari.`);
//             location.reload();
//           },
//           error: (err) => {
//             console.error('Error al obtenir usuaris del equip guanyador:', err);
//             alert('No s\'han pogut obtenir els usuaris del equip guanyador.');
//           }
//         });
//       },
//       error: (err) => {
//         console.error('Error al actualitzar el resultat:', err);
//         alert('No s\'ha pogut assignar el guanyador.');
//       }
//     });
//   }

//   actualitzarEstatTorneig(torneig: ITorneig): string {
//     const avui = new Date();
//     const dataInici = new Date(torneig.data_inici);
//     const dataFi = new Date(torneig.data_fi);

//     if (avui < dataInici) return 'No Començat';
//     if (avui > dataFi) return 'Finalitzat';
//     return 'En Procés';
//   }
// }




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
    const usuariString = localStorage.getItem('user');
    if (usuariString) {
      const usuari = JSON.parse(usuariString);
      const usuariId = usuari.id;
      this.tipusUsuariId = usuari.tipus_usuari_id;

      console.log('Usuari loguejat:', usuariId);

      // Obtener los torneos para el usuario
      this.torneigService.getTorneigsPerUsuari(usuariId).subscribe({
        next: (response) => {
          let tornejos = response.body || [];

          // Filtrar torneos dependiendo del tipo de usuario (individuales o colectivos)
          if (this.tipusUsuariId === 3) {
            tornejos = tornejos.filter(torneig =>
              torneig.equips?.every(equip => equip.maxim_integrants === 1)
            );
          }

          this.torneigs = tornejos;
          console.log('Torneigs filtrats per tipus usuari:', this.torneigs);
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
      if (!torneig || !torneig.equips) {
        alert('No s\'han pogut obtenir les dades del torneig.');
        return;
      }

      // Determinamos si es un torneo individual (maxim_integrants === 1)
      const esTorneigIndividual = torneig.equips.every(e => e.maxim_integrants === 1);

      const currentUser = this.authService.getCurrentUser();
      const currentUserId = currentUser.id;

      // Obtener los equipos del usuario desde la API
      this.http.get<IEquip[]>(`/api/equips/user`).subscribe({
        next: (equips) => {
          // Filtramos los equipos según el tipo de torneo
          const equip = esTorneigIndividual
            ? equips.find(equip => equip.maxim_integrants === 1 && equip.users.length === 1 && equip.users[0].id === currentUserId)
            : equips.find(equip => equip.maxim_integrants >= 2 && equip.users.some(user => user.id === currentUserId));

          if (!equip) {
            alert('No tens un equip adequat per unir-te a aquest torneig.');
            return;
          }

          // Llamar a la API para unirse al torneo
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
          console.error('Error al obtener los equipos del usuario:', err);
          alert('No s\'han pogut obtenir els equips del teu usuari.');
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
      || torneig.estat === 'En procés'
      || this.torneigPle(torneig.id);
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

  actualitzarEstatTorneig(torneig: ITorneig): string {
    const avui = new Date();
    const dataInici = new Date(torneig.data_inici);
    const dataFi = new Date(torneig.data_fi);

    if (avui < dataInici) return 'No Començat';
    if (avui > dataFi) return 'Finalitzat';
    return 'En Procés';
  }
}