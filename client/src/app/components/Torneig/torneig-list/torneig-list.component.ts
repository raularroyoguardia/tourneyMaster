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
  selectedTorneig: ITorneig | null = null;

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

  mostrarDetalls(torneig: ITorneig) {
    this.selectedTorneig = torneig;
  }
  
  tancarModal() {
    this.selectedTorneig = null;
  } 
  
  getTotalPuntos(equipId: number): number {
    if (!this.selectedTorneig?.partides) return 0;

    return this.selectedTorneig.partides.filter(
      partida => partida.resultat_equip_id === equipId
    ).length;
  }

  get equipsOrdenats(): any[] {
    if (!this.selectedTorneig?.equips) return [];

    return [...this.selectedTorneig.equips].sort(
      (a, b) => this.getTotalPuntos(b.id) - this.getTotalPuntos(a.id)
    );
  }

  getTrofeusPerEquip(equipId: number): number {
    if (!this.selectedTorneig) return 0;
  
    const totalVictories = this.selectedTorneig.partides.length;
    const victoriesEquip = this.getTotalPuntos(equipId);
  
    if (totalVictories === 0) return 0;
  
    const premiTotal = this.selectedTorneig.premi_valor || 0;
    return Math.round(victoriesEquip  * premiTotal);
  }
  

}