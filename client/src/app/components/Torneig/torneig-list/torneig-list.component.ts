// import { Component, OnInit } from '@angular/core';
// import { ITorneig } from '../../../interfaces/iTorneig';
// import { DadesTornejosService } from '../../../services/dades-tornejos.service';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { IEquip } from '../../../interfaces/iEquip';

// @Component({
//   selector: 'app-torneig-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './torneig-list.component.html',
//   styleUrl: './torneig-list.component.css'
// })
// export class TorneigListComponent implements OnInit {
//   torneigs: ITorneig[] = [];
//   selectedTorneig: ITorneig | null = null;
//   equipsDisponibles: any[] = [];
//   torneigSeleccionatId: number | null = null;
//   showEquipSelector: boolean = false;
//   equipsTorneigs: ITorneig[] = [];
//   equips: IEquip[] = [];

//   constructor(private torneigService: DadesTornejosService, private http: HttpClient) { }
//   ngOnInit() {
//     //fem servir event de creació
//     console.log("Listat de tornejos inicialitzat");
//     this.torneigService.getTornejos().subscribe(resp => {
//       if (resp.body !== null) {
//         this.torneigs = resp.body;
//       }
//     });
//   }

//   unirseTorneig(torneigId: number) {
//     // 1. Obtenim equips disponibles
//     this.http.get<any[]>('/api/equips/disponibles').subscribe(equips => {
//       if (equips.length === 0) {
//         alert('No tens cap equip disponible per unir-te al torneig.');
//         return;
//       }

//       const equip = equips[0]; // Agafem el primer equip disponible

//       // 2. Fem POST per unir-se al torneig
//       this.http.post('/api/equip/unirse', {
//         torneig_id: torneigId,
//         equip_id: equip.id
//       }).subscribe({
//         next: (res: any) => {
//           alert(res.message);
//         },
//         error: (err) => {
//           alert(err.error.message || 'Error al unir-se al torneig');
//         }
//       });
//     });
//   }

// // unirseTorneig(torneigId: number) {
// //   const torneig = this.torneigs.find(t => t.id === torneigId);

// //   if (torneig && torneig.estat !== 'Començat') {
// //     const maxEquipos = torneig.numero_equips; 
// //     const maxIntegrantsPorEquipo = torneig.tipus === 'individual' ? 1 : torneig.maxim_integrants;

// //     // Verificar si el torneo ya tiene el número máximo de equipos
// //     if (torneig.equips.length >= maxEquipos) {
// //       // Si ya tiene los equipos máximos
// //       alert('El torneo ya ha alcanzado el límite de equipos.');
// //     } else {
// //       // Verificar si se cumplen las condiciones para unirse al torneo
// //       const equipoExistente = torneig.equips.some(e => e.integrants.length >= maxIntegrantsPorEquipo);
// //       if (!equipoExistente) {
// //         // Permitir unirse al torneo
// //         this.agregarEquipoAlTorneig(torneigId);
// //       } else {
// //         alert('No se puede unir a más participantes en los equipos debido a la restricción.');
// //       }
// //     }
// //   }
// // }



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

//   numeroEquiposMaximoAlcanzado(torneig: any): boolean {
//     // Verificar cuántos equipos ya están registrados en el torneo
//     const equiposRegistrados = this.equipsTorneigs.filter(et => et.id === torneig.id).length;

//     console.log('Equipos registrados:', equiposRegistrados);

//     // Calcular el número máximo de equipos permitido
//     let equiposMaximos = 0;
//     if (torneig.tipus === 'individual') {
//       // Si es un torneo individual, el máximo de equipos es igual al número de participantes
//       equiposMaximos = Math.floor(torneig.participants); // Redondear hacia abajo
//     } else if (torneig.tipus === 'col·lectiu') {
//       // Si es un torneo colectivo, calculamos según el número de integrantes por equipo
//       equiposMaximos = Math.floor(torneig.participants / this.maximIntegrantsPorEquipo(torneig));
//     }

//     // Comprobamos si el número de equipos registrados es mayor o igual al máximo permitido
//     return equiposRegistrados >= equiposMaximos;
//   }

//   // Método para obtener el número máximo de integrantes por equipo
//   maximIntegrantsPorEquipo(torneig: any): number {
//     // Esto se asume que obtienes de los equipos, ya que cada equipo tiene el campo 'maxim_integrants'
//     const equipos = this.equips.filter(equip => equip.id === torneig.equip_id);
//     return equipos.length > 0 ? equipos[0].maxim_integrants : 1; // Asumimos que por defecto es 1 si no se encuentra
//   }



// }

import { Component, OnInit } from '@angular/core';
import { ITorneig } from '../../../interfaces/iTorneig';
import { IEquip } from '../../../interfaces/iEquip';
import { DadesTornejosService } from '../../../services/dades-tornejos.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  equipsDisponibles: any[] = [];
  torneigSeleccionatId: number | null = null;
  showEquipSelector: boolean = false;

  equips: IEquip[] = [];
  equipsTorneigs: { torneig_id: number, equip_id: number }[] = [];
  torneigsStats: { torneig_id: number, total_equips: number, maxim_integrants_permesos: number, torneig_ple: boolean }[] = [];


  constructor(private torneigService: DadesTornejosService, private http: HttpClient) { }

  ngOnInit() {
    console.log("Listat de tornejos inicialitzat");

    this.torneigService.getTornejos().subscribe(resp => {
      if (resp.body !== null) {
        this.torneigs = resp.body;
      }
    });

    this.http.get<IEquip[]>('/api/equips').subscribe(data => {
      this.equips = data;
    });
  }

  unirseTorneig(torneigId: number) {
    if (this.torneigPle(torneigId)) {
      alert('Aquest torneig ja està ple i no s\'hi poden afegir més equips.');
      return;
    }
  
    this.http.get<any[]>('/api/equips/disponibles').subscribe(equips => {
      if (equips.length === 0) {
        alert('No tens cap equip disponible per unir-te al torneig.');
        return;
      }
  
      const equip = equips[0]; // o lógica para seleccionar equip
  
      this.http.post('/api/equip/unirse', {
        torneig_id: torneigId,
        equip_id: equip.id
      }).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.ngOnInit(); // Actualiza los datos
        },
        error: (err) => {
          alert(err.error.message || 'Error al unir-se al torneig');
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

  // ✔️ Nuevo: devuelve true si el torneo ya tiene todos los equipos inscritos
  numeroEquipsComplet(torneig: ITorneig): boolean {
    const equipsRegistrats = this.equipsTorneigs.filter(et => et.torneig_id === torneig.id).length;
    return equipsRegistrats >= torneig.numero_equips;
  }

  // ✔️ Nuevo: devuelve true si el botón debe estar deshabilitado
  estaTorneoDeshabilitado(torneig: ITorneig): boolean {
    return torneig.estat === 'Finalitzat'
      || torneig.estat === 'En procès'
      || this.torneigPle(torneig.id);
  }

  // ✔️ Útil si algún torneo es "col·lectiu" y quieres calcular por integrantes
  maximIntegrantsPorEquip(torneig: ITorneig): number {
    const equipsDelTorneig = this.equipsTorneigs
      .filter(et => et.torneig_id === torneig.id)
      .map(et => this.equips.find(e => e.id === et.equip_id))
      .filter(e => e !== undefined) as IEquip[];

    if (equipsDelTorneig.length === 0) return 1;
    const mitjana = equipsDelTorneig.reduce((sum, e) => sum + e.maxim_integrants, 0) / equipsDelTorneig.length;
    return Math.round(mitjana);
  }

  torneigPle(torneigId: number): boolean {
    const stat = this.torneigsStats.find(s => s.torneig_id === torneigId);
    return stat ? stat.torneig_ple : false;
  }
  
}
