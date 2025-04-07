import { Component, OnInit } from '@angular/core';
import { IJoc } from '../../interfaces/iJoc';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesJocsService } from '../../services/dades-jocs.service';

@Component({
  selector: 'app-joc-edit',
  standalone: false,
  templateUrl: './joc-edit.component.html',
  styleUrl: './joc-edit.component.css'
})
export class JocEditComponent implements OnInit {
  myForm!: FormGroup;
  id!: string | null;
  jocs: IJoc[] = [];
  joc: IJoc | null | undefined;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private jocService: DadesJocsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nom: [null],
      categoria: [null],
      plataforma: [null],
      foto: [null]
    });
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.jocService.getJoc(this.id).subscribe({
      next: (data) => {
        this.myForm.setValue({
          nom: data.body ? data.body.nom : null,
          categoria: data.body ? data.body.categoria : null,
          plataforma: data.body ? data.body.plataforma : null,
          foto: [null]
        });
      },
      error: (error) => {
        console.error('Error obteniendo los datos del joc:', error);
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];  // Obtenemos el archivo
    if (file) {
      this.imageFile = file; // Guardamos el archivo en la variable imageFile
    }
  }
  onSubmit(): void {
    if (this.myForm.valid && this.id) {
      const formData = new FormData();
      formData.append('nom', this.myForm.get('nom')?.value);
      formData.append('categoria', this.myForm.get('categoria')?.value);
      formData.append('plataforma', this.myForm.get('plataforma')?.value);
      if (this.imageFile) {
        formData.append('foto', this.imageFile);
      }
      this.jocService.updateJoc(this.id, formData).subscribe({
        next: () => {
          console.log('Joc actualitzat correctament');
          this.router.navigate(['/joc-list']);
        },
        error: (error) => {
          console.error('Error actualitzant el joc:', error);
        }
      });
    }
  }
}
