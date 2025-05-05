import { Component, OnInit } from '@angular/core';
import { IEquip } from '../../../interfaces/iEquip';
import { DadesUsersService } from '../../../services/dades-users.service';
import { DadesEquipsService } from '../../../services/dades-equips.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equip-list',
  imports: [CommonModule],
  templateUrl: './equip-list.component.html',
  styleUrl: './equip-list.component.css'
})
export class EquipListComponent implements OnInit {
  equips: IEquip[] = [];  // Cambiar a un array, no un solo objeto

  constructor(private dadesEquipsService: DadesEquipsService) {}

  ngOnInit(): void {
    this.dadesEquipsService.getUserEquips().subscribe({
      next: (equips) => {
        this.equips = equips;
        console.log('Equip del usuari:', equips);

        // Guardar la lista de equipos en localStorage
        localStorage.setItem("equips", JSON.stringify(equips));
      },
      error: (err) => {
        console.error('Error obtenint equip:', err);
      }
    });
  }

  calcularTrofeosTotales(equip: IEquip): number {
    return equip.users.reduce((total, users) => total + Number(users.trofeus), 0);
  }
  
}




