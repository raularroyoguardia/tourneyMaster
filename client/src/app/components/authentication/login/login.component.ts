import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { TokenService } from '../../../services/auth/token.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, Toast, ButtonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export default class LoginComponent {
  loginForm: FormGroup;
  errors: any;
  showPassword = false;
  touchedControls: { [key: string]: boolean } = {};

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
  }

  onBlur(controlName: string): void {
    this.touchedControls[controlName] = true;
  }
  
  shouldShowError(controlName: string): boolean {
    return this.touchedControls[controlName] && !!this.errors?.[controlName];
  }  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.cleanErrors();
  
    // Marca todos los campos como tocados
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  
    // Si el formulario no es válido, no llamar al backend
    if (this.loginForm.invalid) {
      return;
    }
  
    // Si es válido, hacer la petición
    this.authService.login(this.loginForm.value).subscribe(
      response  => this.handleResponse(response),
      error => this.handleErrors(error)
    );
  }
  
  private handleResponse(response: any): void {
    this.tokenService.handleToken(response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  
    this.router.navigateByUrl('/welcome');
  }

  private handleErrors(errors: any): void {
    const response = errors.error;
  
    // Si vienen errores por campo
    if (response?.errors && typeof response.errors === 'object') {
      Object.keys(response.errors).forEach(field => {
        const control = this.loginForm.get(field);
        if (control) {
          control.setErrors({ server: response.errors[field][0] });
        }
      });
    }
  
    // Si es un mensaje general
    if (typeof response?.errors === 'string') {
      this.errors = { general: response.errors };
    }
  }
  
  private cleanErrors(): void {
    this.errors = null;
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control?.errors?.['server']) {
        control.setErrors(null);
      }
    });
  }
}
