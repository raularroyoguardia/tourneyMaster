import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './services/auth/auth.guard';
import { TorneigListComponent } from './components/Torneig/torneig-list/torneig-list.component';
import { ClassificacioListComponent } from './components/Classificacio/classificacio-list/classificacio-list.component';
import { EquipListComponent } from './components/Equip/equip-list/equip-list.component';
// import { TorneigNewComponent } from './components/Torneig/torneig-new/torneig-new.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },

  { path: 'torneig-list', component: TorneigListComponent /*, canActivate: [AuthGuard]*/ },
  // { path: 'torneig-new', component: TorneigNewComponent /*, canActivate: [AuthGuard]*/ },

  { path: 'clasificacio-list', component: ClassificacioListComponent /*, canActivate: [AuthGuard]*/},

  { path: 'equip-list', component: EquipListComponent /*, canActivate: [AuthGuard]*/},

  //LOGIN
  { path: 'login', loadComponent: ()=> import('./components/authentication/login/login.component')},

  // Default redirection to 'welcome'
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },

  // Wildcard route for 404
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' }
];