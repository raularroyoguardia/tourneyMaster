import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equip-new',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './equip-new.component.html',
  styleUrl: './equip-new.component.css'
})
// export class EquipNewComponent implements OnInit {

//   form: FormGroup;
//   errorMessage = '';
//   selectedImage: File | null = null;

//   regiones: string[] = ['Europa', 'Amèrica', 'Àsia', 'Àfrica', 'Oceania'];

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router
//   ) {
//     this.form = this.fb.group({
//       nom: ['', Validators.required],
//       regio: ['', Validators.required],
//       descripcio: ['', Validators.required],
//       maxim_integrants: [2, [Validators.required, Validators.min(2), Validators.max(5)]],
//       // foto_equip: [null, Validators.required]
//     });
//   }

//   ngOnInit(): void {}

//   onFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedImage = file;
//     }
//   }

//   onSubmit(): void {
//     console.log(this.form.value); 
//     const formData = new FormData();
//     const today = new Date().toISOString().split('T')[0];
  
//     formData.append('nom', this.form.get('nom')?.value);
//     formData.append('regio', this.form.get('regio')?.value);
//     formData.append('descripcio', this.form.get('descripcio')?.value);
//     formData.append('maxim_integrants', this.form.get('maxim_integrants')?.value);
//     formData.append('data_creacio', today);
//     formData.append('trofeus', '0');
  
//     if (this.selectedImage) {
//       formData.append('foto_equip', this.selectedImage);
//     }
  
//     this.http.post('http://127.0.0.1:8000/api/equips', formData).subscribe({
//       next: () => this.router.navigate(['/equip-list']),
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Error al crear l\'equip.';
//       }
//     });
//   }
  
// }

export class EquipNewComponent implements OnInit {

  form: FormGroup;
  errorMessage = '';
  selectedImage: File | null = null;
  regiones: string[] = ['Europa', 'Amèrica', 'Àsia', 'Àfrica', 'Oceania'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(20)]],
      regio: ['', Validators.required],
      descripcio: ['', [Validators.required, Validators.maxLength(255)]],
      maxim_integrants: [2, [Validators.required, Validators.min(2), Validators.max(5)]],
      foto_equip: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      this.form.get('foto_equip')?.setValue(this.selectedImage);
    }
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedImage) {
      this.errorMessage = 'Si us plau, omple tots els camps correctament.';
      return;
    }

    const formData = new FormData();
    const today = new Date().toISOString().split('T')[0];

    formData.append('nom', this.form.get('nom')?.value);
    formData.append('regio', this.form.get('regio')?.value);
    formData.append('descripcio', this.form.get('descripcio')?.value);
    formData.append('maxim_integrants', this.form.get('maxim_integrants')?.value.toString());
    formData.append('data_creacio', today);
    formData.append('trofeus', '0');

    formData.append('foto_equip', this.selectedImage);

    
    this.http.post('http://127.0.0.1:8000/api/equip/new', formData).subscribe({
      next: () => this.router.navigate(['/equip-list']),
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al crear l\'equip. Assegura\'t que la imatge és vàlida i que compleixes els requisits.';
      }
    });
  }
}