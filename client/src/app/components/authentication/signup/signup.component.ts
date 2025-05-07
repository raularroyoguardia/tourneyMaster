import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, StepsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerForm: FormGroup;
  errors: any;
  items: MenuItem[] | undefined;
  active: number = 0;
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
      telefon: ['']
      // NOTA: foto_perfil se maneja por separado, no se incluye aquí
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    this.cleanErrors();

    const formData = new FormData();
    const formValue = this.registerForm.value;

    // Agregar campos normales
    Object.entries(formValue).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    

    // Agregar imagen si existe
    if (this.selectedFile) {
      formData.append('foto_perfil', this.selectedFile);
    }

    // Enviar al servicio
    this.authService.register(formData).subscribe(
      response => this.handleResponse(response),
      errors => this.handleErrors(errors)
    );

    this.items = [
      {
        label: 'Información Personal',
        routerLink: 'personal'
      },
      {
        label: 'Detalles de acceso',
        routerLink: 'info-count'
      }
    ];
  }

  private handleResponse(response: any): void {
    console.log(response.message);
    // TODO: Redirigir si lo deseas
    this.router.navigateByUrl('/welcome');
  }

  private handleErrors(errors: any): void {
    this.errors = errors.error.errors;
    console.log(this.errors);
  }

  private cleanErrors(): void {
    this.errors = null;
  }
}
