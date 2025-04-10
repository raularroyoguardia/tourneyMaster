import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  nombreUsuario: string = ''; // ⚠️ Esto normalmente viene del login o servicio
  telefonoUsuario: string = '';
  isDropdownOpen: boolean = false;
  isModalOpen: boolean = false;
  isRegister: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleModal(isRegister: boolean) {
    this.isRegister = isRegister;
    this.isModalOpen = true;
    this.isDropdownOpen = false; // Cierra el menú desplegable
}
  
  
  closeModal() {
    this.isModalOpen = false;
  }  
  

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  defaultImage: string = 'https://f5c4537feeb2b644adaf-b9c0667778661278083bed3d7c96b2f8.ssl.cf1.rackcdn.com/artistas/perfil-usuario.png';
  userImage: string = '';

  ngOnInit() {
    this.userImage = `uploads/fotoUser/${this.nombreUsuario}_${this.telefonoUsuario}.jpg`;
  }

  setDefaultImage(event: any) {
    event.target.src = this.defaultImage;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}