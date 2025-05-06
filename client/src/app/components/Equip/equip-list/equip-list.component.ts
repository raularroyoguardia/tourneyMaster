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
  equips: IEquip[] = []; 
  equipsDisponibles: IEquip[] = [];


  constructor(private dadesEquipsService: DadesEquipsService) {}

  ngOnInit(): void {
    this.dadesEquipsService.getUserEquips().subscribe({
      next: (equips) => {
        this.equips = equips;
        console.log('Equip del usuari:', equips);
        if (equips.length === 0) {
          this.loadEquipsDisponibles();
        }
        // localStorage.setItem("equips", JSON.stringify(equips));
      },
      error: (err) => {
        console.error('Error obtenint equip:', err);
      }
    });
  }

  calcularTrofeosTotales(equip: IEquip): number {
    return equip.users.reduce((total, users) => total + Number(users.trofeus), 0);
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
}




