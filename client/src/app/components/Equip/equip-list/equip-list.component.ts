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

  constructor(private dadesUsersService: DadesEquipsService) {}

  ngOnInit(): void {
    this.dadesUsersService.getEquips().subscribe({
      next: (res) => {
        console.log(res.body); // Verifica qué viene, pero debería ser un array de equips
        this.equips = res.body || [];
      },
      error: (err) => {
        console.error('Error carregant equips', err);
      }
    });
  }
}


