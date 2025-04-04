import { Component, OnInit } from '@angular/core';
import { ITipusUser } from '../../interfaces/iTipusUser';
import { DadesTipusUsersService } from '../../services/dades-tipus-users.service';

@Component({
  selector: 'app-tipus-user-list',
  standalone: false,
  templateUrl: './tipus-user-list.component.html',
  styleUrl: './tipus-user-list.component.css'
})
export class TipusUserListComponent implements OnInit {
  tipusUsers: ITipusUser[] = [];
  constructor(private tipusUserService: DadesTipusUsersService) { }
  ngOnInit() {
    //fem servir event de creació
    console.log("Listat de tipus d'usuari inicialitzat");
    this.tipusUserService.getTipusUsers().subscribe(resp => {
      if (resp.body !== null) {
        this.tipusUsers = resp.body;
      }
    });
  }
}
