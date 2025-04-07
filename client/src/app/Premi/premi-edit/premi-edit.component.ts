import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPremi } from '../../interfaces/iPremi';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesPremisService } from '../../services/dades-premis.service';

@Component({
  selector: 'app-premi-edit',
  standalone: false,
  templateUrl: './premi-edit.component.html',
  styleUrl: './premi-edit.component.css'
})
export class PremiEditComponent {
  myForm!: FormGroup;
  id!: string | null;
  premis: IPremi[] = [];
  premi: IPremi | null | undefined;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private premiService: DadesPremisService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      posicio_premi: [null],
      valor: [null]
    });
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.premiService.getPremi(this.id).subscribe({
      next: (data) => {
        this.myForm.setValue({
          posicio_premi: data.body ? data.body.posicio_premi : null,
          valor: data.body ? data.body.valor : null
        });
      },
      error: (error) => {
        console.error('Error obteniendo los datos del director:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.myForm.valid && this.id) {
      const formData = new FormData();
      formData.append('posicio_premi', this.myForm.get('posicio_premi')?.value);
      formData.append('valor', this.myForm.get('valor')?.value);

      this.premiService.updatePremi(this.id, formData).subscribe({
        next: () => {
          console.log('Premi updated successfully');
          this.router.navigate(['/premis-list']);
        },
        error: (error) => {
          console.error('Error updating premi:', error);
        }
      });
    }
  }
}
