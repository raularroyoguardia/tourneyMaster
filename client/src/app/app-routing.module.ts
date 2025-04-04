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


const routes: Routes = [
  {path:'welcome', component: WelcomeComponent},
  {path:'equip-list', component: EquipListComponent},
  {path:'torneig-list', component: TorneigListComponent},
  {path:'joc-list', component: JocListComponent},
  {path:'mode-joc-list', component: ModeJocListComponent},
  {path:'partida-list', component: PartidaListComponent},
  {path:'premi-list', component: PremiListComponent},
  {path:'tipus-user-list', component: TipusUserListComponent},
  {path:'user-list', component: UserListComponent},

  {path:'', redirectTo:'welcome', pathMatch:'full'},
  {path:'**', redirectTo:'welcome', pathMatch:'full'},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
