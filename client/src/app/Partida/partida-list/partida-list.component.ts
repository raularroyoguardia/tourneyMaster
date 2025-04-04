import { Component, OnInit } from '@angular/core';
import { IPartida } from '../../interfaces/iPartida';
import { DadesPartidasService } from '../../services/dades-partidas.service';

@Component({
  selector: 'app-partida-list',
  standalone: false,
  templateUrl: './partida-list.component.html',
  styleUrl: './partida-list.component.css'
})
export class PartidaListComponent implements OnInit{
  partides: IPartida[] = [];
  constructor(private partidaService: DadesPartidasService) { }
  ngOnInit() {
    //fem servir event de creació
    console.log("Listat de partides inicialitzat");
    this.partidaService.getPartides().subscribe(resp => {
      if (resp.body !== null) {
        this.partides = resp.body;
      }
    });
  }

}
