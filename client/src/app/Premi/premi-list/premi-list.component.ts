import { Component, OnInit } from '@angular/core';
import { IPremi } from '../../interfaces/iPremi';
import { DadesPremisService } from '../../services/dades-premis.service';

@Component({
  selector: 'app-premi-list',
  standalone: false,
  templateUrl: './premi-list.component.html',
  styleUrl: './premi-list.component.css'
})
export class PremiListComponent implements OnInit {
  premis: IPremi[] = [];
  constructor(private premiService: DadesPremisService) { }
  ngOnInit() {
    //fem servir event de creació
    console.log("Listat de premis inicialitzat");
    this.premiService.getPremis().subscribe(resp => {
      if (resp.body !== null) {
        this.premis = resp.body;
      }
    });
  }
}