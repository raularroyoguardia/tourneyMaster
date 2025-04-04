import { Component, OnInit } from '@angular/core';
import { IJoc } from '../../interfaces/iJoc';
import { DadesJocsService } from '../../services/dades-jocs.service';

@Component({
  selector: 'app-joc-list',
  standalone: false,
  templateUrl: './joc-list.component.html',
  styleUrl: './joc-list.component.css'
})
export class JocListComponent implements OnInit {
  jocs: IJoc[] = [];

  constructor(private jocService: DadesJocsService) { }
  ngOnInit() {
    //fem servir event de creació
    console.log("Listat de jocs inicialitzat");
    this.jocService.getJocs().subscribe(resp => {
      if (resp.body !== null) {
        this.jocs = resp.body;
      }
    });
  }

}
