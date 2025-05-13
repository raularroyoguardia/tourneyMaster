import { Component, OnDestroy, OnInit } from '@angular/core';
import { IEquip } from '../../../interfaces/iEquip';
import { DadesEquipsService } from '../../../services/dades-equips.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equip-list',
  imports: [CommonModule],
  templateUrl: './equip-list.component.html',
  styleUrl: './equip-list.component.css'
})
// export class EquipListComponent implements OnInit {
//   equips: IEquip[] = []; 
//   equipsDisponibles: IEquip[] = [];


//   constructor(private dadesEquipsService: DadesEquipsService) {}

//   ngOnInit(): void {
//     this.dadesEquipsService.getUserEquips().subscribe({
//       next: (equips) => {
//         this.equips = equips
//           .filter((equip: IEquip): boolean => equip.maxim_integrants >= 2)
//           .sort((a: IEquip, b: IEquip): number => b.trofeus - a.trofeus);
//         this.equips.forEach(equip => {
//           if (equip.users) {
//             equip.users.sort((a, b) => b.trofeus - a.trofeus);
//           }
//         });
//         console.log('Equip del usuari:', this.equips);
//         if (equips.length === 0) {
//           this.loadEquipsDisponibles();
//         }
//         localStorage.setItem("equips", JSON.stringify(equips));
//       },
//       error: (err) => {
//         console.error('Error obtenint equip:', err);
//       }
//     });
//   }
  
//   loadEquipsDisponibles(): void {
//     this.dadesEquipsService.getEquipsDisponibles().subscribe({
//       next: (data) => {
//         this.equipsDisponibles = data;
//       },
//       error: (err) => {
//         console.error('Error carregant equips disponibles:', err);
//       }
//     });
//   }

//   unirseEquipo(equipId: number): void {
//     this.dadesEquipsService.unirseAUser(equipId).subscribe({
//       next: (response) => {
//         console.log(response.message);
//         alert('Te has unido al equipo correctamente.');
//         location.reload();
//       },
//       error: (err) => {
//         console.error('Error al unirse al equipo:', err);
//         alert(err.error.message || 'Error al unirse al equipo');
//       }
//     });
//   }
// }

export class EquipListComponent implements OnInit, OnDestroy {
  equips: IEquip[] = []; 
  equipsDisponibles: IEquip[] = [];
  private refreshInterval: any;

  constructor(private dadesEquipsService: DadesEquipsService) {}

  ngOnInit(): void {
    this.loadEquips();

    // 🔁 Refrescar cada 5 segundos (ajusta si lo necesitas)
    this.refreshInterval = setInterval(() => {
      this.loadEquips();
    }, 1000);
  }

  loadEquips(): void {
    this.dadesEquipsService.getUserEquips().subscribe({
      next: (equips) => {
        this.equips = equips
          .filter((equip: IEquip): boolean => equip.maxim_integrants >= 2)
          .sort((a: IEquip, b: IEquip): number => b.trofeus - a.trofeus);

        this.equips.forEach(equip => {
          if (equip.users) {
            equip.users.sort((a, b) => b.trofeus - a.trofeus);
          }
        });

        if (equips.length === 0) {
          this.loadEquipsDisponibles();
        }

        localStorage.setItem("equips", JSON.stringify(equips));
      },
      error: (err) => {
        console.error('Error obtenint equip:', err);
      }
    });
  }

  loadEquipsDisponibles(): void {
    this.dadesEquipsService.getEquipsDisponibles().subscribe({
      next: (data) => {
        this.equipsDisponibles = data;
      },
      error: (err) => {
        console.error('Error carregant equips disponibles:', err);
      }
    });
  }

  unirseEquipo(equipId: number): void {
    this.dadesEquipsService.unirseAUser(equipId).subscribe({
      next: (response) => {
        console.log(response.message);
        alert('T\'has unit al equip correctament.');
        location.reload();
      },
      error: (err) => {
        console.error('Error al unir-se:', err);
        alert(err.error.message || 'Error al unir-se');
      }
    });
  }

  ngOnDestroy(): void {
    // 🧼 Limpiar el intervalo al destruir el componente
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}
