import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IJoc } from '../../../interfaces/iJoc';
import { DadesJocsService } from '../../../services/dades-jocs.service';
import { DadesModeJocsService } from '../../../services/dades-mode-jocs.service';
import { Router } from '@angular/router';
import { IModeJoc } from '../../../interfaces/iModeJoc';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-mode-joc-new',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule,Toast],
  templateUrl: './mode-joc-new.component.html',
  styleUrl: './mode-joc-new.component.css',
  providers: [MessageService]
})
export class ModeJocNewComponent implements OnInit{
  jocs: IJoc[] = [];
  modesJoc: IModeJoc[] = [];
  form: FormGroup;
  errorMessage = '';

  constructor(
    private jocService: DadesJocsService,
    private modeJocService: DadesModeJocsService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      descripcio: ['', Validators.required],
      jugadors: ['', Validators.required, Validators.min(2)],
      joc_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.jocService.getJocs().subscribe({
      next: (res) => {
        if(res.body) {
          this.jocs = res.body;
        }
      },
      error: (err) => {
        console.log('Error en obtenir els modes de joc.', err);
      }
    });
    setInterval(() => {
      this.modeJocService.getModeJocs().subscribe({
        next: (res) => {
          if(res.body) {
            this.modesJoc = res.body;
          }
        },
        error: (err) => {
          console.log("Error en obtenir els modes de jocs.", err);
        }
      });
    }, 1000);
  }

  onSubmit(): void {
    if(this.form.invalid) {
      this.errorMessage = 'Omple tots els camps correctament';
      return;
    }

    const formData = new FormData();

    formData.append('nom', this.form.get('nom')?.value);
    formData.append('descripcio', this.form.get('descripcio')?.value);
    formData.append('jugadors', this.form.get('jugadors')?.value);
    formData.append('joc_id', this.form.get('joc_id')?.value);

    this.modeJocService.createModeJoc(formData).subscribe({
      next: () => {
        this.router.navigate(['/mode-joc-new']);
        this.ngOnInit();
        this.form = this.fb.group({
          nom: ['', Validators.required],
          descripcio: ['', Validators.required],
          jugadors: ['', Validators.required, Validators.min(2)],
          joc_id: ['', Validators.required],
        });
        this.messageService.add({ severity: 'success', summary: 'Mode de Joc', detail: 'Mode de joc afegit correctament.' });
      },
      error: (err) => {
        this.errorMessage = 'Error en crear el mòde de joc';
        console.log(err);
      }
    })
  }

  eliminar(id: any): void {
    this.modeJocService.deleteModeJoc(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'warn', summary: 'Mode de Joc', detail: 'Mode de joc eliminat correctament.' });
        this.ngOnInit();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No s\'ha pogut eliminar el mode de joc.' });
      }
    })
  }
}
