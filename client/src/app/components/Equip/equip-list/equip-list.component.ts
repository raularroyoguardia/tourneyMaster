import { Component, OnDestroy, OnInit } from '@angular/core';
import { IEquip } from '../../../interfaces/iEquip';
import { DadesEquipsService } from '../../../services/dades-equips.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-equip-list',
  imports: [CommonModule, Toast, ButtonModule],
  templateUrl: './equip-list.component.html',
  styleUrl: './equip-list.component.css',
  providers: [MessageService]
})
export class EquipListComponent implements OnInit, OnDestroy {
  equips: IEquip[] = []; 
  equipsDisponibles: IEquip[] = [];
  private refreshInterval: any;

  constructor(
    private dadesEquipsService: DadesEquipsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadEquips();

    this.refreshInterval = setInterval(() => {
      this.loadEquips();
    }, 1000);
  }

  loadEquips(): void {
    this.dadesEquipsService.getUserEquips().subscribe({
      next: (response) => {
        const userEquips = response
          .filter((equip: IEquip) => equip.maxim_integrants >= 2)
          .sort((a: IEquip, b: IEquip) => b.trofeus - a.trofeus);

        userEquips.forEach((equip: { users: any[]; }) => {
          if (equip.users) {
            equip.users.sort((a: { trofeus: number; }, b: { trofeus: number; }) => b.trofeus - a.trofeus);
          }
        });

        this.equips = userEquips;

        if (userEquips.length === 0) {
          this.loadEquipsDisponibles();
        } else {
          this.equipsDisponibles = [];
        }

        localStorage.setItem('equips', JSON.stringify(userEquips));
      },
      error: (err) => {
        console.error('Error obtenint equips:', err);
      }
    });
  }


  loadEquipsDisponibles(): void {
    this.dadesEquipsService.getEquipsDisponibles().subscribe({
      next: (data) => {
        this.equipsDisponibles = data;
        console.log('Equips disponibles:', this.equipsDisponibles);
      },
      error: (err) => {
        console.error('Error carregant equips disponibles:', err);
      }
    });
  }

  unirseEquipo(equipId: number): void {
    this.dadesEquipsService.unirseAUser(equipId).subscribe({
      next: (response) => {
        console.log(response.message);
        this.messageService.add({ severity: 'success', summary: 'Unit amb èxit', detail: 'T\'has unit al equip correctament.' });
        this.loadEquips();
      },
      error: (err) => {
        console.error('Error al unir-se:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al unir-se' });
      }
    });
  }


  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}
