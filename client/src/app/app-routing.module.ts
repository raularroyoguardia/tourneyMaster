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


const routes: Routes = [
  {path:'welcome', component: WelcomeComponent},
  
  {path:'equip-list', component: EquipListComponent},
  {path:'equip-create', component: EquipCreateComponent},
  {path:'equip-edit/:id', component:EquipEditComponent},

  {path:'torneig-list', component: TorneigListComponent},
  {path:'torneig-edit/:id', component: TorneigEditComponent},
  {path:'torneig-create', component: TorneigEditComponent},

  {path:'joc-list', component: JocListComponent},
  {path:'joc-edit/:id', component:JocEditComponent},
  {path:'joc-create', component: JocEditComponent},

  {path:'mode-joc-list', component: ModeJocListComponent},
  {path:'mode-joc-edit/:id', component: ModeJocEditComponent},
  {path:'mode-joc-create', component: ModeJocEditComponent},

  {path:'partida-list', component: PartidaListComponent},
  {path:'partida-edit/:id', component: PartidaEditComponent},
  {path:'partida-create', component: PartidaEditComponent},

  {path:'premi-list', component: PremiListComponent},
  {path:'premi-edit/:id', component: PremiEditComponent},
  {path:'premi-create', component: PremiEditComponent},

  {path:'tipus-user-list', component: TipusUserListComponent},
  {path:'tipus-user-edit/:id', component: TipusUserEditComponent},
  {path:'tipus-user-create', component: TipusUserEditComponent},

  {path:'user-list', component: UserListComponent},
  {path:'user-edit/:id', component: UserEditComponent},
  {path:'user-create', component: UserEditComponent},



  {path:'', redirectTo:'welcome', pathMatch:'full'},
  {path:'**', redirectTo:'welcome', pathMatch:'full'},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
