import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { AuthCredentials } from '../../../interfaces/auth-credentials.model';
import { TokenService } from '../../../services/auth/token.service';
import { HttpClient } from '@angular/common/http';

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
  authCredentials: AuthCredentials = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    public tokenService: TokenService
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      apellido1: [''],
      apellido2: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
      telefon: ['']
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
      formData.append(key, String(value ?? ''));
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

    this.authCredentials.email = this.registerForm.value.email;
    this.authCredentials.password = this.registerForm.value.password;

    // Hacer login automático después del registro
    this.authService.login(this.authCredentials).subscribe({
      next: (loginResponse) => {
        // Guardar token y usuario igual que en LoginComponent
        this.authService.tokenService.handleToken(loginResponse.token);
        localStorage.setItem('user', JSON.stringify(loginResponse.user));
        this.router.navigateByUrl('/welcome');
      },
      error: (loginError) => {
        console.error('Error al hacer login automático:', loginError);
        this.errors = loginError.error.errors ?? { login: 'Error al iniciar sesión después del registro' };
      }
    });
  }

  private handleErrors(errors: any): void {
    this.errors = errors.error.errors;
    console.log(this.errors);
  }

  private cleanErrors(): void {
    this.errors = null;
  }
}
