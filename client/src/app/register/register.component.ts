import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  currentStep = 1;
  profilePhotoFile: File | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    // Inicializar los formularios para cada paso
    this.stepOneForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });

    this.stepTwoForm = this.fb.group({
      phone: [''],
      birthDate: [''],
      profilePhoto: ['']
    });
  }

  goToStepTwo() {
    if (this.stepOneForm.valid) {
      this.currentStep = 2; // Cambiar al siguiente paso
    } else {
      alert('Por favor, completa todos los campos del Paso 1.');
    }
  }

  onFileUpload(event: any) {
    this.profilePhotoFile = event.target.files[0];
  }

  submitRegistration() {
    if (this.stepTwoForm.valid) {
      const registrationData = {
        ...this.stepOneForm.value,
        ...this.stepTwoForm.value,
        profilePhoto: this.profilePhotoFile
      };

      console.log('Datos de registro:', registrationData);
      this.router.navigate(['welcome']); // Redirigir al componente "welcome"
    } else {
      alert('Por favor, completa todos los campos del Paso 2.');
    }
  }
}