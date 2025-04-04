import { Component, OnInit } from '@angular/core';
import { IEquip } from '../../interfaces/iEquip';
import { DadesEquipsService } from '../../services/dades-equips.service';

@Component({
  selector: 'app-equip-list',
  templateUrl: './equip-list.component.html',
  styleUrl: './equip-list.component.css',
  standalone: false,

})
export class EquipListComponent implements OnInit {
  equips: IEquip[] = [];
  constructor(private equipService: DadesEquipsService) { }
  ngOnInit() {
    //fem servir event de creació
    console.log("Listat d'equips inicialitzat");
    this.equipService.getEquips().subscribe(resp => {
      if (resp.body !== null) {
        this.equips = resp.body;
      }
    });
  }
}