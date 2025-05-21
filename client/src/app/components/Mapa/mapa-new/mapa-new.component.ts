import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IModeJoc } from '../../../interfaces/iModeJoc';
import { DadesModeJocsService } from '../../../services/dades-mode-jocs.service';
import { Router } from '@angular/router';
import { DadesMapesService } from '../../../services/dades-mapes.service';
import { IMapa } from '../../../interfaces/iMapa';
import { IJoc } from '../../../interfaces/iJoc';
import { DadesJocsService } from '../../../services/dades-jocs.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-mapa-new',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule,Toast],
  templateUrl: './mapa-new.component.html',
  styleUrl: './mapa-new.component.css',
  providers: [MessageService]
})
export class MapaNewComponent implements OnInit {
modesJocs: IModeJoc[] = [];
mapas: IMapa[] = [];
jocs: IJoc[] = [];
form: FormGroup;
errorMessage = '';
selectedImage: File | null = null;
previewImageUrl: string | null = null;

constructor(
  private modeJocsService: DadesModeJocsService,
  private mapaService: DadesMapesService,
  private jocsService: DadesJocsService,
  private fb: FormBuilder,
  private router: Router,
  private messageService: MessageService
) {
  this.form = this.fb.group({
    nom: ['', Validators.required],
    mapa: ['', Validators.required],
    mode_joc_id: ['', Validators.required]
  });
}

ngOnInit(): void {
  this.modeJocsService.getModeJocs().subscribe({
    next: (res) => {
      if(res.body) {
        this.modesJocs = res.body;
      }
    },
    error: (err) => {
      console.log("Error en obtenir els mapes.", err);
    }
  });
    setInterval(() => {
      this.mapaService.getMapes().subscribe({
        next: (res) => {
          if(res.body) {
            this.mapas = res.body;
          }
        },
        error: (err) => {
          console.log("Error en obtenir els mapes.", err);
        }
      });

      this.jocsService.getJocs().subscribe({
        next: (res) => {
          if(res.body) {
            this.jocs = res.body;
          }
        },
        error: (err) => {
          console.log("Error en obtenir els mapes.", err);
        }
      });
    }, 1000);
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if(input.files && input.files.length > 0) {
    this.selectedImage = input.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewImageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
    this.form.get('mapa')?.setValue(this.selectedImage);
  }
}

onSubmit(): void {
  if(this.form.invalid || !this.selectedImage) {
    this.errorMessage = 'Omple tots els camps correctament';
    return;
  }

  const formData = new FormData();

  formData.append('nom', this.form.get('nom')?.value);
  formData.append('mapa', this.selectedImage);
  formData.append('mode_joc_id', this.form.get('mode_joc_id')?.value);

  this.mapaService.createMapes(formData).subscribe({
    next: () => {
      this.router.navigate(['/mapa-new']);
      this.ngOnInit();
      this.form = this.fb.group({
        nom: ['', Validators.required],
        mapa: [null],
        mode_joc_id: ['', Validators.required]
      });
      this.messageService.add({ severity: 'success', summary: 'Mapa', detail: 'Mapa afegit correctament.' });
      this.selectedImage = null;
      this.previewImageUrl = null;
    },
    error: (err) => {
      this.errorMessage = 'Error en crear el mapa';
      console.log(err);
    }
  });
}

eliminar(id: any): void {
  this.mapaService.deleteMapes(id).subscribe({
    next: () => {
      this.messageService.add({ severity: 'warn', summary: 'Mapa', detail: 'Mapa eliminat correctament.' });
      this.ngOnInit();
    },
    error: (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No s\'ha pogut eliminar el mapa.' });
    }
  });
}
}
