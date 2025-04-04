import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadesJocsService } from '../../services/dades-jocs.service';

@Component({
  selector: 'app-joc-create',
  standalone: false,
  templateUrl: './joc-create.component.html',
  styleUrl: './joc-create.component.css'
})
export class JocCreateComponent implements OnInit{
  myForm: FormGroup;
  selectedFile: File | null = null; 
  errorMessage: string = '';

  constructor(
    private jocService: DadesJocsService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.myForm = this.fb.group({
      nom: ['', Validators.required],
      categoria: ['', Validators.required],
      plataforma: ['', Validators.required],
      foto: [null]
    });
  }
  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Guardem el fitxer seleccionat
    }
  }
  onSubmit(): void {

    if (!this.selectedFile) {
      this.errorMessage = 'Has de seleccionar un fitxer.';
      return;
    }
    const formData = new FormData();
    formData.append('nom', this.myForm.get('nom')?.value);
    formData.append('categoria', this.myForm.get('categoria')?.value);
    formData.append('plataforma', this.myForm.get('plataforma')?.value);
    formData.append('foto', this.selectedFile);


    this.jocService.createJoc(formData).subscribe({
      next: (response) => {
        console.log('Joc creat:', response);
        this.router.navigate(['/joc-list']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error en crear el joc.';
      }
    });
  }
}



