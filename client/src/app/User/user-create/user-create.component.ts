import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadesUsersService } from '../../services/dades-users.service';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit {
  myForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: DadesUsersService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefon: ['', Validators.required],
      data_naixement: ['', Validators.required],
      foto_perfil: [null],
      trofeus: ['', Validators.required],
      data_registre: ['', Validators.required],
      tipus_usuari_id: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; 
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Has de seleccionar un fitxer.';
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.myForm.get('nom')?.value);
    formData.append('email', this.myForm.get('email')?.value);
    formData.append('telefon', this.myForm.get('telefon')?.value);
    formData.append('data_naixement', this.myForm.get('data_naixement')?.value);
    formData.append('foto_perfil', this.selectedFile);
    formData.append('trofeus', this.myForm.get('trofeus')?.value);
    formData.append('data_registre', this.myForm.get('data_registre')?.value);
    formData.append('tipus_usuari_id', this.myForm.get('tipus_usuari_id')?.value);
    this.userService.createUser(formData).subscribe({
      next: (response) => {
        console.log('Usuari creat correctament', response);
        this.router.navigate(['/user-list']);
      },
      error: (error) => {
        console.error('Error al crear l\'usuari', error);
      }
    });
  }
}
