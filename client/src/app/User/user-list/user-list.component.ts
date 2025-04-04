import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iUser';
import { DadesUsersService } from '../../services/dades-users.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  users: IUser[] = [];
  constructor(private userService: DadesUsersService) { }
  ngOnInit() {
    //fem servir event de creació
    console.log("Listat d'usuaris inicialitzat");
    this.userService.getUsers().subscribe(resp => {
      if (resp.body !== null) {
        this.users = resp.body;
      }
    });
  }
}