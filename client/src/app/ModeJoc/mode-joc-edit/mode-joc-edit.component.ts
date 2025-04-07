import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IModeJoc } from '../../interfaces/iModeJoc';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesModeJocsService } from '../../services/dades-mode-jocs.service';

@Component({
  selector: 'app-mode-joc-edit',
  standalone: false,
  templateUrl: './mode-joc-edit.component.html',
  styleUrl: './mode-joc-edit.component.css'
})
export class ModeJocEditComponent {
  myForm!: FormGroup;
  id!: string | null;
  modeJocs: IModeJoc[] = [];
  modeJoc: IModeJoc | null | undefined;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,  
    private modeJocService: DadesModeJocsService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      nom: [null],
      descripcio: [null],
      jugadors: [null]
    });
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.modeJocService.getModeJoc(this.id).subscribe({
      next: (data) => {
        this.myForm.setValue({
          nom: data.body ? data.body.nom : null,
          descripcio: data.body ? data.body.descripcio : null,
          jugadors: data.body ? data.body.jugadors : null
        });
      },
      error: (error) => {
        console.error('Error obteniendo los datos del mode joc:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.myForm.valid && this.id) {
      const formData = new FormData();
      formData.append('nom', this.myForm.get('nom')?.value);
      formData.append('descripcio', this.myForm.get('descripcio')?.value);
      formData.append('jugadors', this.myForm.get('jugadors')?.value);

      this.modeJocService.updateModeJoc(this.id, formData).subscribe({
        next: () => {
          console.log('Mode joc updated successfully');
          this.router.navigate(['/mode-jocs-list']);
        },
        error: (error) => {
          console.error('Error updating mode joc:', error);
        }
      });
    }
  }
}
