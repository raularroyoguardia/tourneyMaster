import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { EquipListComponent } from './Equip/equip-list/equip-list.component';
import { TorneigListComponent } from './Torneig/torneig-list/torneig-list.component';
import { JocListComponent } from './Joc/joc-list/joc-list.component';
import { ModeJocListComponent } from './ModeJoc/mode-joc-list/mode-joc-list.component';
import { PartidaListComponent } from './Partida/partida-list/partida-list.component';
import { PremiListComponent } from './Premi/premi-list/premi-list.component';
import { TipusUserListComponent } from './TipusUser/tipus-user-list/tipus-user-list.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { EquipEditComponent } from './Equip/equip-edit/equip-edit.component';
import { JocEditComponent } from './Joc/joc-edit/joc-edit.component';
import { ModeJocEditComponent } from './ModeJoc/mode-joc-edit/mode-joc-edit.component';
import { PartidaEditComponent } from './Partida/partida-edit/partida-edit.component';
import { PremiEditComponent } from './Premi/premi-edit/premi-edit.component';
import { TipusUserEditComponent } from './TipusUser/tipus-user-edit/tipus-user-edit.component';
import { TorneigEditComponent } from './Torneig/torneig-edit/torneig-edit.component';
import { UserEditComponent } from './User/user-edit/user-edit.component';
import { EquipCreateComponent } from './Equip/equip-create/equip-create.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent},

  { path: 'equip-list', component: EquipListComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'equip-create', component: EquipCreateComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'equip-edit/:id', component: EquipEditComponent, /*canActivate: [AuthGuard]*/ },

  { path: 'torneig-list', component: TorneigListComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'torneig-edit/:id', component: TorneigEditComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'torneig-create', component: TorneigEditComponent, /*canActivate: [AuthGuard]*/ },

  { path: 'joc-list', component: JocListComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'joc-edit/:id', component: JocEditComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'joc-create', component: JocEditComponent, /*canActivate: [AuthGuard]*/ },

  { path: 'mode-joc-list', component: ModeJocListComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'mode-joc-edit/:id', component: ModeJocEditComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'mode-joc-create', component: ModeJocEditComponent, /*canActivate: [AuthGuard]*/ },

  { path: 'partida-list', component: PartidaListComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'partida-edit/:id', component: PartidaEditComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'partida-create', component: PartidaEditComponent, /*canActivate: [AuthGuard]*/ },

  { path: 'premi-list', component: PremiListComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'premi-edit/:id', component: PremiEditComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'premi-create', component: PremiEditComponent, /*canActivate: [AuthGuard]*/ },

  { path: 'tipus-user-list', component: TipusUserListComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'tipus-user-edit/:id', component: TipusUserEditComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'tipus-user-create', component: TipusUserEditComponent, /*canActivate: [AuthGuard]*/ },

  { path: 'user-list', component: UserListComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'user-edit/:id', component: UserEditComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'user-create', component: UserEditComponent, /*canActivate: [AuthGuard]*/ },

  // Redirección por defecto a 'welcome' si el usuario está autenticado
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },

  // Redirección en caso de ruta no encontrada
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
