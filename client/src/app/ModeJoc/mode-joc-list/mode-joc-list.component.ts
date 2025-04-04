import { Component, OnInit } from '@angular/core';
import { IModeJoc } from '../../interfaces/iModeJoc';
import { DadesModeJocsService } from '../../services/dades-mode-jocs.service';

@Component({
  selector: 'app-mode-joc-list',
  standalone: false,
  templateUrl: './mode-joc-list.component.html',
  styleUrl: './mode-joc-list.component.css'
})
export class ModeJocListComponent implements OnInit{
  modesJoc: IModeJoc[] = [];
  constructor(private modejocService: DadesModeJocsService) { }
  ngOnInit() {
    //fem servir event de creació
    console.log("Listat de modes de joc inicialitzat");
    this.modejocService.getModeJocs().subscribe(resp => {
      if (resp.body !== null) {
        this.modesJoc = resp.body;
      }
    });
  }

}
