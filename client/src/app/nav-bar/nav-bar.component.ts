import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  nombreUsuario: string = 'Juan'; // ⚠️ Esto normalmente viene del login o servicio
  telefonoUsuario: string = '123456789';

  defaultImage: string = 'https://f5c4537feeb2b644adaf-b9c0667778661278083bed3d7c96b2f8.ssl.cf1.rackcdn.com/artistas/perfil-usuario.png';
  userImage: string = '';

  ngOnInit() {
    this.userImage = `uploads/fotoUser/${this.nombreUsuario}_${this.telefonoUsuario}.jpg`;
  }

  setDefaultImage(event: any) {
    event.target.src = this.defaultImage;
  }
}