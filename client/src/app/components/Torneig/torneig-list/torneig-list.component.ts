import { Component, OnInit } from '@angular/core';
import { ITorneig } from '../../../interfaces/iTorneig';
import { DadesTornejosService } from '../../../services/dades-tornejos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-torneig-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './torneig-list.component.html',
  styleUrl: './torneig-list.component.css'
})
export class TorneigListComponent implements OnInit{
  torneigs: ITorneig[] = [];
  constructor(private torneigService: DadesTornejosService) { }
  ngOnInit() {
    //fem servir event de creació
    console.log("Listat de tornejos inicialitzat");
    this.torneigService.getTornejos().subscribe(resp => {
      if (resp.body !== null) {
        this.torneigs = resp.body;
      }
      console.log(this.torneigs);
    });
  }
  
  unirseTorneig(id: number) {
    console.log(`Unint-se al torneig amb id ${id}`);
    // Aquí puedes hacer una petición POST o navegar a la vista del torneig
  }

  
}