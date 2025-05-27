import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../interfaces/iUser';
import { DadesUsersService } from '../../../services/dades-users.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  readonly BASE_URL = environment.baseURL;
  usuaris: IUser[] = [];
  usuariIdLoguejat: number | null = null;

  constructor(private usuariService: DadesUsersService) { }

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

  // Método para obtener las iniciales del nombre
  getInitials(name: string): string {
    if (!name) return "?"
    return name.charAt(0).toUpperCase()
  }
}
