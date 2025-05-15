import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../interfaces/iUser';
import { DadesUsersService } from '../../../services/dades-users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  usuaris: IUser[] = [];
  usuariIdLoguejat: number | null = null;

  constructor(private usuariService: DadesUsersService) {}

  ngOnInit(): void {
    const usuariLocal = localStorage.getItem('user');
    if (usuariLocal) {
      const usuari = JSON.parse(usuariLocal);
      this.usuariIdLoguejat = usuari.id;
    }

    this.usuariService.getUsers().subscribe({
      next: (res) => {
        if (res.body) {
          this.usuaris = res.body.filter(u => u.id !== this.usuariIdLoguejat);
          console.log(this.usuaris);
        }
      },
      error: (err) => {
        console.error('Error obtenint usuaris', err);
      }
    });
  }
  getNomTipusUsuari(id: number): string {
    switch (id) {
      case 1:
        return 'BOSS';
      case 2:
        return 'Admin del equipo';
      case 3:
        return 'Usuario del equipo';
      default:
        return 'Desconegut';
    }
  }
  
}
