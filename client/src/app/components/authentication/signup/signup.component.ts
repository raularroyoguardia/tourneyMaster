import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, StepsModule],
  providers: [MessageService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerForm: FormGroup;
  errors: any;
  items: MenuItem[] | undefined;

  active: number = 0;

  uploadedFiles: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confimation: [''],
      telefon: [''],
      foto_perfil: [''],
    });
  }

  onSubmit(): void {
    this.cleanErrors();
    this.authService.register(this.registerForm.value).subscribe(
      response => this.handleResponse(response),
      errors => this.handleErrors(errors)
    );

    this.items = [
      {
        label: 'Información Perosnal',
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

    //TODO: Redirect to login
  }

  private handleErrors(errors: any): void {
    this.errors = errors.error.errors;
    console.log(this.errors);
  }

  private cleanErrors(): void {
    this.errors = null;
  }
}
