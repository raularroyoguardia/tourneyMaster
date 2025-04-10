import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  // Propiedad para controlar el estado del formulario (login o registro)
  isRegister: boolean = false;

  // Propiedades para almacenar los datos del formulario
  id: string = '';
  name: string = '';
  email: string = '';
  email_verified_at: string = '';
  password: string = '';
  telefon: string = '';
  data_naixement: string = '';
  foto_perfil: File | null = null;


  constructor(private authService: AuthService, private router: Router) {}

  submitLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response: { token: string; user: any }) => { // Define el tipo correcto aquí
        console.log('Login exitoso:', response);
  
        // Mostrar alerta al usuario
        alert('¡Login exitoso! Bienvenido.');
  
        // Redirigir al usuario a la página de bienvenida
        this.router.navigate(['/welcome']);
  
        // Cerrar el modal
        this.closeModal();
      },
      (error: any) => { // Usa 'any' temporalmente si no conoces el formato del error
        console.error('Error en el login:', error);
  
        // Mostrar mensaje de error
        alert('Error: Credenciales incorrectas.');
      }
    );
  }
  

  // Método para enviar el formulario de registro
  submitRegister() {
    // Aquí iría la lógica de registro (como una llamada a un servicio de registro)
    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('email_verified_at', this.email_verified_at);
    formData.append('password', this.password);
    formData.append('telefon', this.telefon);
    formData.append('data_naixement', this.data_naixement);
    if (this.foto_perfil) {
      formData.append('foto_perfil', this.foto_perfil, this.foto_perfil.name);
    }

    console.log('Register data:', formData);
  }

  // Método para manejar el cambio de archivo (foto de perfil)
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.foto_perfil = file;
    }
  }
  // Método para cerrar el modal
  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }
  
}


