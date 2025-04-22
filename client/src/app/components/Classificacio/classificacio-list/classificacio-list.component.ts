import { Component, OnInit } from '@angular/core';
import { IEquip } from '../../../interfaces/iEquip';
import { DadesEquipsService } from '../../../services/dades-equips.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classificacio-list',
  imports: [CommonModule],
  templateUrl: './classificacio-list.component.html',
  styleUrl: './classificacio-list.component.css'
})
export class ClassificacioListComponent implements OnInit {
  equips: IEquip[] = [];
  individualData: any[] = [];
  collectiveData: any[] = [];
  selectedEquip: any | null = null; // Para un equipo seleccionado
  showIndividual: boolean = true; // Alternar entre individual y colectivo

  constructor(private equipService: DadesEquipsService) { }

  ngOnInit() {
    console.log("Listat d'equips inicialitzat");

    // Opcional: Cargar la lista de equipos si aún es necesaria
    this.equipService.getEquips().subscribe(resp => {
      if (resp.body !== null) {
        this.equips = resp.body;
      }
      // console.log(this.equips);
    });

    // Cargar datos de clasificaciones individual y colectiva
    this.loadIndividualData();
    this.loadCollectiveData();
  }

  // Cargar clasificación individual
  loadIndividualData(): void {
    this.equipService.getIndividual().subscribe(data => {
      this.individualData = data; // Guardar los datos individuales
    });
    // console.log(this.individualData);
  }

  // Cargar clasificación colectiva
  loadCollectiveData(): void {
    this.equipService.getCollectiu().subscribe(data => {
      this.collectiveData = data; // Guardar los datos colectivos
    });
    // console.log(this.collectiveData);
  }

  // Alternar vista entre individual y colectivo
  toggleView(view: string): void {
    this.showIndividual = view === 'individual'; // Cambia la bandera para mostrar la tabla adecuada
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
