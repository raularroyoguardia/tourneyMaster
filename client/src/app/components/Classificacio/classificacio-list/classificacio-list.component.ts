import { Component, OnInit } from '@angular/core';
import { IEquip } from '../../../interfaces/iEquip';
import { DadesEquipsService } from '../../../services/dades-equips.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-classificacio-list',
  imports: [CommonModule],
  templateUrl: './classificacio-list.component.html',
  styleUrl: './classificacio-list.component.css'
})
export class ClassificacioListComponent implements OnInit {
  readonly BASE_URL = environment.baseURL;
  equips: IEquip[] = [];
  individualData: any[] = [];
  collectiveData: any[] = [];
  selectedEquip: any | null = null;
  showIndividual: boolean = true;

  constructor(private equipService: DadesEquipsService) { }

  ngOnInit() {
    setInterval(() => {
    this.equipService.getEquips().subscribe(resp => {
      if (resp.body !== null) {
        this.equips = resp.body;
      }
    });

    this.loadIndividualData();
    this.loadCollectiveData();
    }, 1000);
    console.log("Listat d'equips inicialitzat");

    this.loadIndividualData();
    this.loadCollectiveData();
  }

  // Cargar clasificación individual
  loadIndividualData(): void {
    this.equipService.getIndividual().subscribe(data => {
      this.individualData = data;
    });
  }

  // Cargar clasificación colectiva
  loadCollectiveData(): void {
    this.equipService.getCollectiu().subscribe(data => {
      this.collectiveData = data;
    });
  }

  // Alternar vista entre individual y colectivo
  toggleView(view: string): void {
    this.showIndividual = view === 'individual';
  }

  // Método para seleccionar un equipo específico (si lo necesitas)
  onSelectEquip(id: any) {
    this.equipService.getEquip(id).subscribe((resp) => {
      if (resp.body !== null) {
        this.selectedEquip = resp.body;
      }
    });
  }
}
